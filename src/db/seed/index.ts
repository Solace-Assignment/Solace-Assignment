import db from '..';
import { advocates, advocateSpecialties } from '../schema';
import { advocateData } from './advocates';

async function seed() {
  console.log('Seeding the database...');

  // Insert the advocate records
  await db.transaction(async (tx) => {
    for (const advocate of advocateData) {
      const advocateRecord = await tx
        .insert(advocates)
        .values(advocate)
        .returning({ id: advocates.id });

      await tx.insert(advocateSpecialties).values(
        advocate.specialties.map((specialty) => ({
          advocateId: advocateRecord[0].id,
          specialty,
        })),
      );
    }
  });
}

seed()
  .then(() => {
    console.log('Seeding complete.');

    process.exit(0);
  })
  .catch((e) => {
    console.error('Failed to seed.');
    console.error(e);

    process.exit(1);
  });
