'use client';

import { useState, useEffect } from "react";
import AnswersSection from "@/app/components/containers/answers-section";
import randomCharacters from "@/app/components/supports/random-characters";
import { Globals } from "../globals";
import { shuffle } from "@/app/components/supports/shuffle";

export default function Home() {
    const [posts, setPosts] = useState<any | null>(null);
    const [allowShuffling, setShuffling] = useState(true);

    const fetchData = async () => {
        const response = await fetch('https://opentdb.com/api.php?amount=1&category=9&type=multiple');
        const data = await response.json();
        setPosts(data);
    };
  
    const shuffleButtons = (buttonList:any) =>{
         return shuffle(buttonList);
    }

    useEffect(() => {
      const intervalId = setTimeout(fetchData, 5000);
      return () => clearInterval(intervalId);
    }, []);
   

    return (
        <div>
            <AnswersSection posts={posts} onUpdate={fetchData} onShuffleButtons={shuffleButtons} allowShuffling={setShuffling}/>
        </div>
    );
}