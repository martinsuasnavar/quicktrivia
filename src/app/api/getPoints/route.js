import connection from "../../lib/db";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const session_id = searchParams.get("session_id");

        if (!session_id || session_id.trim() === "") {
            return new Response(
                JSON.stringify({ error: "El parámetro 'session_id' es requerido y no puede estar vacío." }),
                { status: 400 }
            );
        }

       
        const [rows] = await connection.execute(
            "SELECT points FROM points WHERE session_id = ?",
            [session_id]
        );

        if (rows.length === 0) {
            return new Response(
                JSON.stringify({ error: `No se encontraron puntos para la sesión con ID: ${session_id}` }),
                { status: 404 }
            );
        }

        const points = rows[0].points;
        return new Response(JSON.stringify({ points }), { status: 200 });
    } catch (error) {
        console.error(`Error al obtener puntos para la sesión: ${error.message}`, {
            session_id: req.url.includes("session_id") ? searchParams.get("session_id") : null,
        });
        return new Response(
            JSON.stringify({ error: "Ocurrió un error inesperado al obtener los puntos." }),
            { status: 500 }
        );
    }
}