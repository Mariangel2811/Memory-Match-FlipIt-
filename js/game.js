// ================================
// VARIABLES
// ================================

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let gameStarted = false;

// ================================
// VOLTEAR CARTA
// ================================

function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }

    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;

    gameState.moves++;

    updateHUD();

    checkPair();

}

// ================================
// COMPROBAR PAREJA
// ================================

function checkPair() {

    lockBoard = true;

    const isMatch =
        firstCard.dataset.icon === secondCard.dataset.icon;

    if (isMatch) {

        successPair();

    } else {

        failPair();

    }

}

// ================================
// PAREJA CORRECTA
// ================================

function successPair() {

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    gameState.pairs++;

    gameState.consecutiveMatches++;

    if (gameState.mode === "pvp") {

        gameState.players[gameState.currentPlayer].score++;

    }

    checkAchievements();

    updateHUD();

    resetSelection();

    checkVictory();

}

// ================================
// PAREJA INCORRECTA
// ================================

function failPair() {

    gameState.consecutiveMatches = 0;

    firstCard.classList.add("error");
    secondCard.classList.add("error");

    setTimeout(() => {

        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        firstCard.classList.remove("error");
        secondCard.classList.remove("error");

        if (gameState.mode === "pvp") {

            changeTurn();

        }

        resetSelection();

    },1000);

}

// ================================
// REINICIAR SELECCIÓN
// ================================

function resetSelection(){

    firstCard=null;
    secondCard=null;
    lockBoard=false;

}

// ================================
// COMPROBAR VICTORIA
// ================================

function checkVictory(){

    if(gameState.pairs===gameState.totalPairs){

        stopTimer();

        showEndScreen();

    }

}

// ================================
// REINICIAR JUEGO
// ================================

function resetGame(){

    stopTimer();

    gameStarted=false;

    firstCard=null;
    secondCard=null;

    lockBoard=false;

    gameState.moves=0;
    gameState.pairs=0;
    gameState.timer=0;
    gameState.currentPlayer=0;
    gameState.consecutiveMatches=0;

    gameState.achievements=[];

    if(gameState.mode==="pvp"){

        gameState.players.forEach(player=>{

            player.score=0;

        });

    }

    document.getElementById("achievementList").innerHTML="";

    document.getElementById("endScreen").classList.add("hidden");

    resetTimer();

    createBoard();

    updateHUD();

}

// ================================
// BOTÓN REINICIAR
// ================================

document
.getElementById("restartGame")
.addEventListener("click",resetGame);

// ================================
// JUGAR DE NUEVO
// ================================

document
.getElementById("playAgain")
.addEventListener("click",resetGame);

// ================================
// VOLVER AL MENÚ
// ================================

document
.getElementById("backMenu")
.addEventListener("click",()=>{

    location.reload();

});