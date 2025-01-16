import Cookies from "js-cookie";
import { callApi } from "../../api/fetch";

export const getSessionPoints = async () => {
    const sessionId = Cookies.get("session");

    console.log("Sesión:", sessionId);
    if (!sessionId) {
        console.error("No se encontró la sesión.");
        return 0;
    }

    try {
        const response = await callApi(
            process.env.DOMAIN + `/api/getPoints?session_id=${sessionId}`,
            "GET"
        );

        const data = await response;
        console.log("Puntos de la sesión:", data);
        
        return data.points;
      
    } catch (error) {
        console.error("Error al obtener puntos:", error.message);
        return 0;
    }
};