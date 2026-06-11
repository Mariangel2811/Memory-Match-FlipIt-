function shuffle(array){

    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];

    }
    return array;
}

function randomId(){
    return Math.random().toString(36).substring(2,10);
}

function formatTime(seconds){
    const min=Math.floor(seconds/60);
    const sec=seconds%60;
    return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

function clearElement(element){
    element.innerHTML="";
}