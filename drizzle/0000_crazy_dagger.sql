CREATE TABLE IF NOT EXISTS "advocate_specialties" (
	"id" serial PRIMARY KEY NOT NULL,
	"advocate_id" integer,
	"specialty" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "advocates" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"city" text NOT NULL,
	"degree" text NOT NULL,
	"years_of_experience" integer NOT NULL,
	"phone_number" bigint NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "advocate_specialties" ADD CONSTRAINT "advocate_specialties_advocate_id_advocates_id_fk" FOREIGN KEY ("advocate_id") REFERENCES "public"."advocates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "advocate_id_idx" ON "advocate_specialties" USING btree ("advocate_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_specialty" ON "advocate_specialties" USING btree ("advocate_id","specialty");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "first_name_idx" ON "advocates" USING btree (lower("first_name"));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "last_name_idx" ON "advocates" USING btree (lower("last_name"));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "city_idx" ON "advocates" USING btree (lower("city"));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "degree_idx" ON "advocates" USING btree (lower("degree"));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "years_of_experience_idx" ON "advocates" USING btree ("years_of_experience");