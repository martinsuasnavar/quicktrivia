'use client';

import Home from "./home/page"
import  CreateSession  from "./components/supports/create-session";

export default function Index() {
    CreateSession();
    
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
    return(
        <Home></Home>
    )
}
