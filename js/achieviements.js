const achievements = {
    firstPair: false,
    streak: false,
    firstTry: false,
    speed: false
};

function resetAchievements() {
    achievements.firstPair = false;
    achievements.streak = false;
    achievements.firstTry = false;
    achievements.speed = false;
}

function showNotification(message) {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerHTML = `
        <div class="toast-icon">🏆</div>
        <div class="toast-content">
            <div class="toast-title">¡Logro Desbloqueado!</div>
            <div class="toast-message">${message}</div>
        </div>
    `;

    container.appendChild(toast);

    // Auto-remove after 4 seconds (slide out + fade)
    setTimeout(() => {
        toast.classList.add("toast-hide");
        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    }, 4000);
}

function unlock(name) {
    if (!gameState.achievements) {
        gameState.achievements = [];
    }
    if (gameState.achievements.includes(name)) return;
    
    gameState.achievements.push(name);
    
    const list = document.getElementById("achievementList");
    if (list) {
        const li = document.createElement("li");
        li.textContent = "🏆 " + name;
        list.appendChild(li);
    }
    
    showNotification(name);
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