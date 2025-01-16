import connection from "../../lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { session_id, points } = body;

    console.log("Payload enviado a la API:", {
      session_id: session_id,
      points: points
    });

    if (!session_id || points == null) {
      return new Response(JSON.stringify({ error: "session_id y points son requeridos." }), {
        status: 400,
      });
    }

    const [result] = await connection.execute(
      "INSERT INTO points (session_id, points) VALUES (?, ?)",
      [session_id, points]
    );

    return new Response(JSON.stringify({ success: true, id: result.insertId }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error al insertar datos:", error);
    return new Response(JSON.stringify({ error: "Error al insertar datos." }), {
      status: 500,
    });
  }
}