import { NextResponse } from "next/server";
import { query } from "../../../../../server/db";

export async function GET(
  req: Request,
  { params }: { params: { resourceType: string; resourceId: string } }
) {
  try {
    const { resourceType, resourceId } = params;

    const rows = await query(
      `SELECT COUNT(*)::int AS count, AVG(score)::numeric(3,2) AS avg
       FROM ratings
       WHERE resource_type=$1 AND resource_id=$2`,
      [resourceType, resourceId]
    );

    const count = rows[0]?.count ?? 0;
    const average = rows[0]?.avg ? Number(rows[0].avg) : null;

    return NextResponse.json({ count, average }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
