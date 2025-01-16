export default function randomCharacters(){
    return Math.random().toString(36).substr(2);
}