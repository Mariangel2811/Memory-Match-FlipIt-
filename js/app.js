const startButton =
    document.getElementById("startGame");

const restartButton =
    document.getElementById("restartGame");

const playAgain =
    document.getElementById("playAgain");

const backMenu =
    document.getElementById("backMenu");

startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", restartGame);

playAgain.addEventListener("click", startGame);

backMenu.addEventListener("click", () => {

    location.reload();

});

function startGame() {

    readConfiguration();

    document
        .getElementById("menu")
        .classList.add("hidden");

    document
        .getElementById("hud")
        .classList.remove("hidden");

    document.body.className =
        gameState.theme;

    gameState.moves = 0;
    gameState.pairs = 0;
    gameState.timer = 0;
    gameState.currentPlayer = 0;
    gameState.achievements = [];

    resetTimer();

    createBoard();

    updateHUD();

    startTimer();

}

function restartGame() {

    stopTimer();

    startGame();

}