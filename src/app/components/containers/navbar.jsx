"use client";

import { useState, useEffect } from "react";
import { getSessionPoints } from "../supports/get-points";

export default function NavBar() {
    const [points, setPoints] = useState(null);

    useEffect(() => {
        const fetchPoints = async () => {
            const sessionPoints = await getSessionPoints();
            setPoints(sessionPoints);
        };
    
        fetchPoints();
    
        const interval = setInterval(fetchPoints, 5000);
    
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-semibold p-4 bg-black w-full fixed top-0">
            <div className="float-right mr-2 h-10 flex">
                {/*<div className="text-yellow-500 mr-2">
                    {points !== null ? points : "0"}
                </div>
                <div>POINTS</div>*/}
            </div>
        </div>
    );
}
