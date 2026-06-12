function showEndScreen() {
    const modal = document.getElementById("endScreen");
    modal.classList.remove("hidden");

    const results = document.getElementById("results");
    let html = "";

    html += `<p><strong>📊 Resultados</strong></p>`;
    html += `<p>🎯 Movimientos: ${gameState.moves}</p>`;
    html += `<p>🏆 Pares encontrados: ${gameState.pairs}/${gameState.totalPairs}</p>`;
    
    if (gameState.mode !== "free") {
        html += `<p>⏱ Tiempo: ${formatTime(gameState.timer)}</p>`;
    }

    if (gameState.mode === "pvp") {
        html += `<p><strong>🏅 ${checkWinner()}</strong></p>`;
        html += `<p>${gameState.players[0].name}: ${gameState.players[0].score} pts</p>`;
        html += `<p>${gameState.players[1].name}: ${gameState.players[1].score} pts</p>`;
    }

    if (gameState.achievements.length > 0) {
        html += "<h3>🏆 Logros Desbloqueados</h3><ul>";
        gameState.achievements.forEach(a => {
            html += `<li>${a}</li>`;
        });
        html += "</ul>";
    } else {
        html += "<p>✨ Sin logros desbloqueados</p>";
    }

    results.innerHTML = html;
}