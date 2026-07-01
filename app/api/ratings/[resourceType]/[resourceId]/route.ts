import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

type RatingAggregateRow = {
  count: string; // Postgres COUNT returns text when cast
  avg: string | null;
};

export async function GET(
  _req: Request,
  { params }: { params: { resourceType: string; resourceId: string } }
) {
  const { resourceType, resourceId } = params;

  try {
    const result = await pool.query(
      `SELECT COUNT(*)::text AS count, AVG(rating)::text AS avg
       FROM ratings
       WHERE resource_type = $1 AND resource_id = $2`,
      [resourceType, resourceId]
    );

    const rows = result.rows as RatingAggregateRow[];

    const count = rows[0]?.count ? Number(rows[0].count) : 0;
    const average = rows[0]?.avg ? Number(rows[0].avg) : null;

    return NextResponse.json({ count, average }, { status: 200 });
  } catch (err) {
    console.error("Ratings GET error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
