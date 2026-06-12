let gameStarted = false;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startGame");
    
    if (startButton) {
        startButton.addEventListener("click", startGame);
    }
});

function startGame() {
    console.log("Iniciando juego...");
    
    readConfiguration();

    // Ocultar menú, mostrar juego
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("hud").classList.remove("hidden");
    document.getElementById("achievementPanel").classList.remove("hidden");

    // Resetear estado
    gameState.moves = 0;
    gameState.pairs = 0;
    gameState.timer = 0;
    gameState.currentPlayer = 0;
    gameState.consecutiveMatches = 0;
    gameState.achievements = [];

    // Resetear logros locales
    achievements.firstPair = false;
    achievements.streak = false;
    achievements.firstTry = false;
    achievements.speed = false;

    document.getElementById("achievementList").innerHTML = "";
    document.getElementById("moves").textContent = "0";
    document.getElementById("pairs").textContent = "0";
    
    resetTimer();
    createBoard();
    updateHUD();

    // Reiniciar variables de juego
    gameStarted = false;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}