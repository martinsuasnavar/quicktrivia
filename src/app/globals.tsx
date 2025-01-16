import AnswerButton from "./components/buttons/answer-button";


const defaultMethod = () =>{

}
let globalButtons  = {states: ['none','none','none','none'], value: [<AnswerButton onClick={defaultMethod} state="">Generic</AnswerButton>], allowSelection: true};
export { globalButtons };

let globalButtonStates  = {value: ["none","none","none","none"]};
export { globalButtonStates };

export class Globals {
    static #shuffledButtons: boolean;
    static serverName: string;
    static buttons: any;

    constructor(serverName: string, shuffledButtons: boolean = false){
        Globals.serverName = serverName;
        Globals.#shuffledButtons = shuffledButtons;
    }

    static areButtonsShuffled(): boolean{
        return Globals.#shuffledButtons;
    }
    
    static setShuffledButtons(value:boolean){
        Globals.#shuffledButtons=value;
    }

    static setButotns(value:any){
        Globals.buttons=value;
    }
}


/*
//////////////
//properties//
//////////////

let booleans = { #shuffledButtons: false }
export { booleans };


let newAnswerButtons: JSX.Element[] = [];
export default newAnswerButtons;

const serverName = "http://localhost:3000";
export { serverName };

///////////
//methods//
///////////

export function areButtonsShuffled(){
    return booleans.shuffledButtons;
}

export function setShuffledButtons(value:boolean){
    booleans.shuffledButtons=value;
}
*/
