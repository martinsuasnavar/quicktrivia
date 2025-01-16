'use client';

import Home from "./home/page"
import  CreateSession  from "./components/supports/create-session";

export default function Index() {
    CreateSession();
    return(
        <Home></Home>
    )
}
