// ================================
// ESTADO DEL JUEGO
// ================================
let gameState = {
    mode: "solo",
    difficulty: 4,
    theme: "animals",
    players: [
        { name: "Jugador 1", score: 0 },
        { name: "Jugador 2", score: 0 }
    ],
    currentPlayer: 0,
    moves: 0,
    pairs: 0,
    totalPairs: 0,
    timer: 0,
    timerInterval: null
};

let gameStarted = false;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// ================================
// UTILIDADES
// ================================
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// ================================
// TIMER
// ================================
function startTimer() {
    if (gameState.mode === "free") return;
    if (gameState.timerInterval) return;

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

// ================================
// HUD - ACTUALIZAR INTERFAZ
// ================================
function updateHUD() {
    const player1Score = document.querySelector("#player1Info .player-score");
    const player2Score = document.querySelector("#player2Info .player-score");
    const movesElement = document.getElementById("moves");
    const totalPairsElement = document.getElementById("totalPairs");
    
    if (player1Score) player1Score.textContent = `Pares: ${gameState.players[0].score}`;
    if (player2Score) player2Score.textContent = `Pares: ${gameState.players[1].score}`;
    if (movesElement) movesElement.textContent = gameState.moves;
    if (totalPairsElement) totalPairsElement.textContent = `${gameState.pairs}/${gameState.totalPairs}`;
    
    const player1Name = document.querySelector("#player1Info .player-name");
    const player2Name = document.querySelector("#player2Info .player-name");
    const currentTurnSpan = document.getElementById("currentTurn");
    
    if (player1Name) player1Name.textContent = gameState.players[0].name;
    if (player2Name) player2Name.textContent = gameState.players[1].name;
    
    const player1Div = document.getElementById("player1Info");
    const player2Div = document.getElementById("player2Info");
    
    if (gameState.mode === "pvp") {
        if (gameState.currentPlayer === 0) {
            player1Div.classList.add("active");
            player2Div.classList.remove("active");
            if (currentTurnSpan) currentTurnSpan.textContent = gameState.players[0].name;
        } else {
            player1Div.classList.remove("active");
            player2Div.classList.add("active");
            if (currentTurnSpan) currentTurnSpan.textContent = gameState.players[1].name;
        }
    } else {
        player1Div.classList.remove("active");
        player2Div.classList.remove("active");
        if (currentTurnSpan) currentTurnSpan.textContent = "";
    }
}

// ================================
// CAMBIAR FONDO
// ================================
function changeBackground(theme) {
    const body = document.getElementById("body");
    body.classList.remove("theme-animals", "theme-food", "theme-transport");
    body.classList.add(`theme-${theme}`);
}

function setupThemeSelector() {
    const themeSelect = document.getElementById("theme");
    if (themeSelect) {
        themeSelect.addEventListener("change", () => {
            changeBackground(themeSelect.value);
        });
        changeBackground(themeSelect.value);
    }
}

// ================================
// CREAR TABLERO
// ================================
function createBoard() {
    const board = document.getElementById("gameBoard");
    if (!board) {
        console.error("No se encontró el elemento gameBoard");
        return;
    }
    
    board.innerHTML = "";
    board.className = "board";

    const difficulty = parseInt(gameState.difficulty);
    
    switch (difficulty) {
        case 4:
            board.classList.add("easy");
            break;
        case 6:
            board.classList.add("medium");
            break;
        case 8:
            board.classList.add("hard");
            break;
    }

    const totalCards = difficulty * difficulty;
    gameState.totalPairs = totalCards / 2;

    console.log(`Creando tablero ${difficulty}x${difficulty}, Total cartas: ${totalCards}, Pares: ${gameState.totalPairs}`);

    // Obtener los íconos del tema seleccionado
    let themeIcons = [...themes[gameState.theme]];
    
    // Seleccionar solo los necesarios
    let cards = themeIcons.slice(0, gameState.totalPairs);
    cards = [...cards, ...cards];
    cards = shuffle(cards);

    gameState.board = cards;

    cards.forEach((icon, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.icon = icon;
        card.dataset.index = index;

        card.innerHTML = `
            <div class="front">${icon}</div>
            <div class="back">?</div>
        `;

        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
    
    console.log(`Tablero creado con ${cards.length} cartas`);
}

// ================================
// VOLTEAR CARTA
// ================================
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.classList.contains("flip")) return;
    if (this.classList.contains("matched")) return;

    if (!gameStarted) {
        gameStarted = true;
        if (gameState.mode !== "free") {
            startTimer();
        }
    }

    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    gameState.moves++;
    updateHUD();
    checkMatch();
}

// ================================
// COMPROBAR COINCIDENCIA
// ================================
function checkMatch() {
    lockBoard = true;

    const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    if (isMatch) {
        handleMatch();
    } else {
        handleMismatch();
    }
}

// ================================
// MANEJAR COINCIDENCIA
// ================================
function handleMatch() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    gameState.pairs++;
    gameState.players[gameState.currentPlayer].score++;
    
    updateHUD();
    resetSelection();
    checkVictory();
}

// ================================
// MANEJAR NO COINCIDENCIA
// ================================
function handleMismatch() {
    firstCard.classList.add("error");
    secondCard.classList.add("error");

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        firstCard.classList.remove("error");
        secondCard.classList.remove("error");
        
        if (gameState.mode === "pvp") {
            gameState.currentPlayer = gameState.currentPlayer === 0 ? 1 : 0;
            updateHUD();
        }
        
        resetSelection();
    }, 800);
}

// ================================
// REINICIAR SELECCIÓN
// ================================
function resetSelection() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// ================================
// COMPROBAR VICTORIA
// ================================
function checkVictory() {
    if (gameState.pairs === gameState.totalPairs) {
        stopTimer();
        showEndScreen();
    }
}

// ================================
// MOSTRAR PANTALLA FINAL
// ================================
function showEndScreen() {
    const endScreen = document.getElementById("endScreen");
    const results = document.getElementById("results");
    
    let html = "";
    
    if (gameState.mode === "pvp") {
        html += `<p><strong>📊 RESULTADOS FINALES</strong></p>`;
        html += `<p>🏆 ${gameState.players[0].name}: ${gameState.players[0].score} pares</p>`;
        html += `<p>🏆 ${gameState.players[1].name}: ${gameState.players[1].score} pares</p>`;
        
        if (gameState.players[0].score > gameState.players[1].score) {
            html += `<p class="winner-text">🎉 ¡${gameState.players[0].name} ES EL GANADOR! 🎉</p>`;
        } else if (gameState.players[1].score > gameState.players[0].score) {
            html += `<p class="winner-text">🎉 ¡${gameState.players[1].name} ES EL GANADOR! 🎉</p>`;
        } else {
            html += `<p class="winner-text">🤝 ¡EMPATE! 🤝</p>`;
        }
    } else {
        html += `<p><strong>📊 RESULTADOS</strong></p>`;
        html += `<p>🎯 Movimientos: ${gameState.moves}</p>`;
        html += `<p>🏆 Pares: ${gameState.pairs}/${gameState.totalPairs}</p>`;
        if (gameState.mode !== "free") {
            html += `<p>⏱ Tiempo: ${formatTime(gameState.timer)}</p>`;
        }
        html += `<p class="winner-text">🎉 ¡FELICIDADES! 🎉</p>`;
    }
    
    html += `<p>📊 Precisión: ${gameState.moves > 0 ? Math.round((gameState.pairs / gameState.moves) * 100) : 0}%</p>`;
    
    results.innerHTML = html;
    endScreen.classList.remove("hidden");
}

// ================================
// LEER CONFIGURACIÓN
// ================================
function readConfiguration() {
    gameState.mode = document.getElementById("gameMode").value;
    gameState.difficulty = parseInt(document.getElementById("difficulty").value);
    gameState.theme = document.getElementById("theme").value;

    const p1 = document.getElementById("player1").value.trim() || "Jugador 1";

    if (gameState.mode === "pvp") {
        const p2 = document.getElementById("player2").value.trim() || "Jugador 2";
        gameState.players = [
            { name: p1, score: 0 },
            { name: p2, score: 0 }
        ];
    } else {
        gameState.players = [
            { name: p1, score: 0 },
            { name: "Jugador 2", score: 0 }
        ];
    }
    
    console.log("Configuración:", gameState);
}

// ================================
// INICIAR JUEGO
// ================================
function startGame() {
    console.log("Iniciando juego...");
    
    readConfiguration();

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("hud").classList.remove("hidden");

    gameState.moves = 0;
    gameState.pairs = 0;
    gameState.timer = 0;
    gameState.currentPlayer = 0;
    gameState.players[0].score = 0;
    gameState.players[1].score = 0;

    document.getElementById("moves").textContent = "0";
    
    resetTimer();
    createBoard();
    updateHUD();

    gameStarted = false;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// ================================
// REINICIAR JUEGO
// ================================
function resetGame() {
    stopTimer();
    gameStarted = false;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    
    gameState.moves = 0;
    gameState.pairs = 0;
    gameState.timer = 0;
    gameState.currentPlayer = 0;
    gameState.players[0].score = 0;
    gameState.players[1].score = 0;

    document.getElementById("moves").textContent = "0";
    document.getElementById("endScreen").classList.add("hidden");
    
    resetTimer();
    createBoard();
    updateHUD();
}

// ================================
// VOLVER AL MENÚ
// ================================
function backToMenu() {
    stopTimer();
    location.reload();
}

// ================================
// CONFIGURAR EVENTOS
// ================================
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startGame");
    const restartButton = document.getElementById("restartGame");
    const playAgain = document.getElementById("playAgain");
    const backMenu = document.getElementById("backMenu");
    const backToMenuBtn = document.getElementById("backToMenu");
    const modeSelect = document.getElementById("gameMode");
    const playerTwo = document.getElementById("playerTwo");

    setupThemeSelector();

    if (startButton) {
        startButton.addEventListener("click", startGame);
    }
    
    if (restartButton) {
        restartButton.addEventListener("click", resetGame);
    }
    
    if (playAgain) {
        playAgain.addEventListener("click", () => {
            document.getElementById("endScreen").classList.add("hidden");
            resetGame();
        });
    }
    
    if (backMenu) {
        backMenu.addEventListener("click", backToMenu);
    }
    
    if (backToMenuBtn) {
        backToMenuBtn.addEventListener("click", backToMenu);
    }
    
    if (modeSelect) {
        modeSelect.addEventListener("change", () => {
            if (modeSelect.value === "pvp") {
                playerTwo.style.display = "block";
            } else {
                playerTwo.style.display = "none";
            }
        });
    }
});