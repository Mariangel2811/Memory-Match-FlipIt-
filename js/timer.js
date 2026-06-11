function startTimer() {

    if (gameState.mode === "free")
        return;
    
    if (gameState.timerInterval)
        return;

    gameState.timerInterval = setInterval(() => {
        gameState.timer++;
        document.getElementById("timer").textContent =
            formatTime(gameState.timer);
    }, 1000);

}

function stopTimer() {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;

}

function resetTimer() {
    stopTimer();
    gameState.timer = 0;
    document.getElementById("timer").textContent = "00:00";

}