'use client';

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { callApi } from "../../api/fetch";
import { getSessionPoints } from "./get-points";

export default function UpdateSession() {
    const [points, setPoints] = useState(0);

 
    const fetchPoints = async () => {
        const data = await getSessionPoints();
        if (data) {
            setPoints(data.points);
        }
    };


    useEffect(() => {
        fetchPoints();
    }, []);
   
    const handleUpdatePoints = async () => {
        const sessionId = Cookies.get("session");
        if (!sessionId) {
            console.error("No se encontró la sesión.");
            return;
        }

        const newPoints = points + 100;

  
        const result = await callApi(
            process.env.DOMAIN + `/api/putData`,
            "PUT",
            { session_id: sessionId, points: newPoints }
        );

        if (result && result.ok) {
            console.log("Puntos actualizados correctamente:", result);
            setPoints(newPoints);
        } else {
            console.error("No se pudieron actualizar los puntos.");
        }
    };

    return (
        <div>
            <h2>Puntos: {points}</h2>
            <button onClick={handleUpdatePoints}>Actualizar Puntos</button>
        </div>
    );
}