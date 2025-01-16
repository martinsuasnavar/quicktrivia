export default async function Fetching(){
    let data = await fetch('https://opentdb.com/api.php?amount=1&category=9&type=multiple');
    let posts = await data.json();
}