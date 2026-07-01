// server/db.ts
import { Pool, QueryResult } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

export async function query(text: string, params?: any[]): Promise<any[]> {
  const res: QueryResult = await pool.query(text, params);
  return res.rows;
}
