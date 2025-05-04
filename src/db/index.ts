import assert from 'node:assert';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

assert(process.env.DATABASE_URL, 'DATABASE_URL is not set');

const queryClient = postgres(process.env.DATABASE_URL);
const db = drizzle(queryClient);

export default db;
