'use client';

import Home from "./home/page"
import  CreateSession  from "./components/supports/create-session";

export default function Index() {
    CreateSession();
    
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "******" : "undefined");
    console.log("DB_NAME:", process.env.DB_NAME);
    console.log("DB_PORT:", process.env.DB_PORT);
    
    return(
        <Home></Home>
    )
}
