import db from '../../../db';
import { advocates, advocateSpecialties } from '../../../db/schema';
import { NextRequest } from 'next/server';
import { or, eq, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get('search')?.toLowerCase();
  const searchPattern = search?.concat('%');

  const data = await db
    .select({
      id: advocates.id,
      firstName: advocates.firstName,
      lastName: advocates.lastName,
      city: advocates.city,
      degree: advocates.degree,
      yearsOfExperience: advocates.yearsOfExperience,
      phoneNumber: advocates.phoneNumber,
      specialties: sql<string>`array_agg(${advocateSpecialties.specialty})`,
    })
    .from(advocates)
    .leftJoin(
      advocateSpecialties,
      eq(advocates.id, advocateSpecialties.advocateId),
    )
    .groupBy(advocates.id)
    .where(
      search
        ? or(
            sql`lower(${advocates.firstName}) LIKE ${searchPattern}`,
            sql`lower(${advocates.lastName}) LIKE ${searchPattern}`,
            sql`lower(${advocates.city}) LIKE ${searchPattern}`,
            sql`lower(${advocates.degree}) LIKE ${searchPattern}`,
            sql`lower(${advocateSpecialties.specialty}) LIKE ${searchPattern}`,
            !isNaN(parseInt(search))
              ? eq(advocates.yearsOfExperience, parseInt(search))
              : undefined,
          )
        : undefined,
    );

  return Response.json({ data });
}
