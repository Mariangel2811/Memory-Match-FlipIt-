const board = document.getElementById("gameBoard");

function createBoard() {
    if (!board) {
        console.error("No se encontró el elemento gameBoard");
        return;
    }
    
    board.innerHTML = "";
    board.className = "board";

    switch (parseInt(gameState.difficulty)) {
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

    const totalCards = gameState.difficulty * gameState.difficulty;
    gameState.totalPairs = totalCards / 2;

    // Obtener los íconos del tema seleccionado
    let themeIcons = [...themes[gameState.theme]];
    
    // Verificar que haya suficientes íconos únicos para la dificultad
    if (themeIcons.length < gameState.totalPairs) {
        console.error(`No hay suficientes emojis únicos. Necesitas ${gameState.totalPairs} pero solo hay ${themeIcons.length}`);
        return;
    }
    
    // Seleccionar solo los necesarios (todos únicos)
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
    
    console.log("Tablero creado con", cards.length, "cartas");
}