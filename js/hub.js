function updateHUD() {
    const movesElement = document.getElementById("moves");
    const pairsElement = document.getElementById("pairs");
    const playerNameElement = document.getElementById("playerName");
    const turnIndicator = document.getElementById("turnIndicator");
    
    if (movesElement) movesElement.textContent = gameState.moves;
    if (pairsElement) pairsElement.textContent = gameState.pairs;

    if (gameState.mode === "pvp" && gameState.players.length > 1) {
        const currentPlayer = gameState.players[gameState.currentPlayer];
        if (playerNameElement) {
            playerNameElement.innerHTML = `${currentPlayer.name} (${currentPlayer.score})`;
        }
        if (turnIndicator) turnIndicator.textContent = "🎮 Turno";
    } else {
        if (playerNameElement) {
            playerNameElement.innerHTML = gameState.players[0]?.name || "Jugador";
        }
        if (turnIndicator) turnIndicator.textContent = "";
    }
}