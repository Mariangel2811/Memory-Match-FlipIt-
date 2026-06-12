function startTimer() {
    if (gameState.mode === "free") return;
    if (gameState.timerInterval) return;
    if (!gameStarted) return;

    gameState.timerInterval = setInterval(() => {
        gameState.timer++;
        const timerElement = document.getElementById("timer");
        if (timerElement) {
            timerElement.textContent = formatTime(gameState.timer);
        }
    }, 1000);
}

function stopTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    gameState.timer = 0;
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        timerElement.textContent = "00:00";
    }
}