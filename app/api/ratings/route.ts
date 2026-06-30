import { NextResponse } from "next/server";
import { query } from "../../../server/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { resourceType, resourceId, score, comment } = body;

    if (!resourceType || !resourceId || typeof score !== "number") {
      return NextResponse.json(
        { error: "resourceType, resourceId, score required" },
        { status: 400 }
      );
    }

    if (score < 1 || score > 5) {
      return NextResponse.json(
        { error: "score must be between 1 and 5" },
        { status: 400 }
      );
    }

    const rows = await query(
      `INSERT INTO ratings (resource_type, resource_id, score, comment)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (resource_type, resource_id)
       DO UPDATE SET score = EXCLUDED.score, comment = EXCLUDED.comment, updated_at = now()
       RETURNING *`,
      [resourceType, resourceId, score, comment || null]
    );

    return NextResponse.json({ rating: rows[0] }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
