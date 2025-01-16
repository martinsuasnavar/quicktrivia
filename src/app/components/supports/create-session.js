import { useEffect, useState } from "react";
import randomCharacters from "./random-characters";
import Cookies from "js-cookie";
import { callApi } from "../../api/fetch";

export default function CreateSession() {
    const [cookieValue, setCookieValue] = useState(null);
    const cookieName = "session";

    const createSession = async (newSessionKey) => {
        try {
            const response = await callApi(
                `http://localhost:3000/api/postData`,
                "POST",
                { session_id: newSessionKey, points: 0 }
            );
           
            if (response.ok) {
                console.log("Session created!");
            } else {
                console.error(
                    `Error: Session couldn't be created. Attempted session key was: ${newSessionKey}`
                );
            }
        } catch (error) {
            console.error("Error while creating session:", error);
        }
    };

    useEffect(() => {
        const existingCookie = Cookies.get(cookieName);
        if (!existingCookie) {
            const newCookieValue = randomCharacters();
            Cookies.set(cookieName, newCookieValue, { expires: 7 });
            setCookieValue(newCookieValue);
            createSession(newCookieValue);
        } else {
            setCookieValue(existingCookie);
        }
    }, []);

    return <div>Session: {cookieValue || "Creating session..."}</div>;
}