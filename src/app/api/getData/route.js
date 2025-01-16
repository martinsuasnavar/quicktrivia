import { NextResponse } from "next/server";
import connection from "../../lib/db";

export async function GET() {
  try {
    const [rows] = await connection.query("SELECT * FROM points");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return NextResponse.json(
      { error: "ERROR 500:" + error },
      { status: 500 }
    );
  }
}