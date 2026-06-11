function updateHUD() {

    document.getElementById("moves").textContent =
        gameState.moves;

    document.getElementById("pairs").textContent =
        gameState.pairs;

    document.getElementById("playerName").textContent =
        gameState.players[gameState.currentPlayer].name;

    if (gameState.mode === "pvp") {
        document.getElementById("turnIndicator").textContent =
            "Turno";

    } else {
        document.getElementById("turnIndicator").textContent =
            "";

    }

}