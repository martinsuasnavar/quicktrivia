'use client';

import { useState } from "react";
import AnswerButton from "../buttons/answer-button";
import { shuffle } from "../supports/shuffle";
import Image from "next/image";
//import randomCharacters from "../supports/random-characters";
import { globalButtons } from "../../globals";
import { callApi } from "../../api/fetch";
import { getSessionPoints } from "../supports/get-points";
import Cookies from "js-cookie";

interface Prop {
    posts: any;
    onUpdate: () => Promise<void>;
    onShuffleButtons: any;
    allowShuffling: any;
}

export default function AnswersSection({ posts, onUpdate, onShuffleButtons, allowShuffling}: Prop) {
    const [correctAnswer, isCorrectAnswer] = useState(false);
    const [incorrectAnswer, isIncorrectAnswer] = useState(false);
    const [hiddenResults, isHidingResults] = useState(true);
    const [state, setState] = useState(['none','none','none','none']);

    const hideTime = 5000;

    //let newStates = ['none','none','none','none']

    let answerButtons: JSX.Element[] = [];
    //let newAnswerButtons: JSX.Element[] = [];
    let questionText = "Loading...";
   


    const addPoints = async (sessionId: string) => {
        const newPoints = await getSessionPoints() + 100;
    
        const result = await callApi(
            `http://localhost:3000/api/putData`,
            "PUT",
            { session_id: sessionId, points: newPoints }
        );
    
        if (result && result.ok) {
            console.log("Puntos añadidos correctamente:", result);
        } else {
            console.error("No se pudieron añadir puntos.");
        }
    };   
 

   
    /*const shuffleAnswers = (answersList: JSX.Element[]) => {
        return shuffle([...answersList]);
    };*/
    
    const hideAnswerResults = () => {
        isIncorrectAnswer(false);
        isCorrectAnswer(false);
        isHidingResults(true);
        globalButtons.allowSelection=true;
        setState(['none','none','none','none']);
        onUpdate();
    };


    const triggerHideResults = (index:number,state:string) => {
      isHidingResults(false);
      setTimeout(hideAnswerResults, hideTime);
      globalButtons.states[index]=state;
      setState(globalButtons.states);
    }


    const toggleCorrectAnswer = async (index: number) => {
        if (!globalButtons.allowSelection) {
            return;
        }
        globalButtons.allowSelection = false;
        isIncorrectAnswer(false);
        isCorrectAnswer(true);
        await addPoints(Cookies.get("session") || "");
        triggerHideResults(index, "correct");
    };

    const toggleIncorrectAnswer = (index:number) => {
        if(!globalButtons.allowSelection){
          return;
        } 
        globalButtons.allowSelection=false;
        isCorrectAnswer(false);
        isIncorrectAnswer(true);
        triggerHideResults(index,"incorrect");
    };

    if (posts && posts.results && posts.results[0]) {
        const incorrectAnswers = posts.results[0]?.incorrect_answers || [];
        questionText=posts.results[0].question;
        answerButtons = [
            <AnswerButton state={state[3]} key="correct-answer" onClick={()=>toggleCorrectAnswer(3)}>
                {posts.results[0].correct_answer}
            </AnswerButton>,
            ...incorrectAnswers.map((answer: string, index: number) => (
                <AnswerButton state={state[index]} key={`incorrect-answer-${index}`} onClick={()=>toggleIncorrectAnswer(index)}>
                    {answer}
                </AnswerButton>
            )),
        ];
    }

    if(hiddenResults){
        for (let i = answerButtons.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answerButtons[i], answerButtons[j]] = [answerButtons[j], answerButtons[i]];
        }
        globalButtons.value=answerButtons;
    }else{
        answerButtons=globalButtons.value;
    }
    
    return (
        <div>
            <main className="mx-20 h-screen mx-20">
                <hr className="my-10"></hr>
                <div className="justify-center flex"><Image alt="main logo" src="/logo.png" width={500} height={500}></Image></div>
                <section className="w-max mx-auto p-2">
                    <section className="mb-2 text-center content-center w-80">
                        
                        <div className="font-semibold">{questionText}</div>
                        <hr className="my-5" />
                        {answerButtons.map((button) => (
                            <div className="mb-2" key={button.key}>
                                {button}
                            </div>
                        ))}
                    </section>
                    <div>
                        {correctAnswer && <div className="font-semibold text-lime-500 text-center">CORRECT</div>}
                        {incorrectAnswer && <div className="font-semibold text-red-500 text-center">INCORRECT
                          <div>Correct answer was {posts.results[0].correct_answer}</div>
                          </div>}
                    </div>
                </section>
            </main>
        </div>
    );

}