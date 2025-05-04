import { sql } from 'drizzle-orm';
import {
  pgTable,
  integer,
  text,
  serial,
  timestamp,
  bigint,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

const advocates = pgTable(
  'advocates',
  {
    id: serial('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    city: text('city').notNull(),
    degree: text('degree').notNull(),
    yearsOfExperience: integer('years_of_experience').notNull(),
    phoneNumber: bigint('phone_number', { mode: 'number' }).notNull(),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    firstNameIndex: index('first_name_idx').using(
      'btree',
      sql`lower(${table.firstName})`,
    ),
    lastNameIndex: index('last_name_idx').using(
      'btree',
      sql`lower(${table.lastName})`,
    ),
    cityIndex: index('city_idx').using('btree', sql`lower(${table.city})`),
    degreeIndex: index('degree_idx').using(
      'btree',
      sql`lower(${table.degree})`,
    ),
    yearsOfExperienceIndex: index('years_of_experience_idx').on(
      table.yearsOfExperience,
    ),
  }),
);

const advocateSpecialties = pgTable(
  'advocate_specialties',
  {
    id: serial('id').primaryKey(),
    advocateId: integer('advocate_id').references(() => advocates.id),
    specialty: text('specialty').notNull(),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    advocateIdIndex: index('advocate_id_idx').on(table.advocateId),
    uniqueSpecialty: uniqueIndex('unique_specialty').on(
      table.advocateId,
      table.specialty,
    ),
  }),
);

export { advocates, advocateSpecialties };
