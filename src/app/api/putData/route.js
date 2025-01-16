import connection from "../../lib/db";

export async function PUT(req) {
    try {
        const body = await req.json();
        const { session_id, points } = body;

        if (!session_id || points == null) {
            return new Response(JSON.stringify({ error: "session_id y points son requeridos." }), {
                status: 400,
            });
        }

        const [result] = await connection.execute(
            "UPDATE points SET points = ? WHERE session_id = ?",
            [points, session_id]
        );

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: "No se encontró la sesión para actualizar." }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify({ success: true, updatedRows: result.affectedRows }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error al actualizar los puntos:", error);
        return new Response(JSON.stringify({ error: "Error al actualizar los puntos." }), {
            status: 500,
        });
    }
}