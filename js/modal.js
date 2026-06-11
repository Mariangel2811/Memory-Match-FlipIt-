function showEndScreen() {

    const modal =
        document.getElementById("endScreen");

    modal.classList.remove("hidden");

    const results =
        document.getElementById("results");

    let html = "";

    html += `<p>Movimientos: ${gameState.moves}</p>`;

    html += `<p>Pares: ${gameState.pairs}</p>`;

    if (gameState.mode !== "free") {

        html += `<p>Tiempo: ${formatTime(gameState.timer)}</p>`;

    }

    if (gameState.mode === "pvp") {

        html += `<p>${checkWinner()}</p>`;

    }

    html += "<h3>Logros</h3>";

    html += "<ul>";

    gameState.achievements.forEach(a => {

        html += `<li>${a}</li>`;

    });

    html += "</ul>";

    results.innerHTML = html;

}