function changeTurn() {

    if (gameState.mode !== "pvp") return;
    gameState.currentPlayer =
        gameState.currentPlayer === 0 ? 1 : 0;
    updateHUD();

}

function addPoint() {
    if (gameState.mode !== "pvp") return;
    gameState.players[gameState.currentPlayer].score++;
    updateHUD();

}

function checkWinner() {

    if (gameState.mode !== "pvp") return "";

    const p1 = gameState.players[0].score;
    const p2 = gameState.players[1].score;

    if (p1 > p2)
        return `${gameState.players[0].name} gana`;

    if (p2 > p1)
        return `${gameState.players[1].name} gana`;

    return "Empate";
}