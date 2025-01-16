import React from "react";

interface Props {
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    state: string;
}

export default function AnswerButton({children, onClick, state}: Props){
    let bgColor:string='black';
    
    switch(state){
        case 'none':
        bgColor='bg-black';
        break;
        case 'incorrect':
        bgColor='bg-red-500';
        break;
        case 'correct':
        bgColor='bg-green-500';
        break;
    }

    /*
    const setState = () => {

    }*/
    
    return(
        <div onClick={onClick} className={`transition-transform duration-300 transform hover:scale-105 border-solid border-2 border-black ${bgColor} text-center h-10 w-full cursor-pointer`}>
            {children}
        </div>
    );
}