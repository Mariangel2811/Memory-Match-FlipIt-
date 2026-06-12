const achievements = {
    firstPair: false,
    streak: false,
    firstTry: false,
    speed: false
};

function unlock(name) {
    if (gameState.achievements.includes(name)) return;
    
    gameState.achievements.push(name);
    const li = document.createElement("li");
    li.textContent = "🏆 " + name;
    document.getElementById("achievementList").appendChild(li);
    
    if (typeof showNotification === 'function') {
        showNotification(`¡Logro desbloqueado: ${name}!`);
    }
}

function checkAchievements() {
    if (!achievements.firstPair && gameState.pairs === 1) {
        achievements.firstPair = true;
        unlock("Primer Par");
    }

    if (!achievements.streak && gameState.consecutiveMatches >= 3) {
        achievements.streak = true;
        unlock("Racha Caliente");
    }

    if (!achievements.firstTry && gameState.moves === 1 && gameState.pairs === 1) {
        achievements.firstTry = true;
        unlock("Sin Titubeos");
    }

    if (!achievements.speed && gameState.timer <= 30 && gameState.difficulty === 8 && gameState.pairs === gameState.totalPairs) {
        achievements.speed = true;
        unlock("Velocista");
    }
}