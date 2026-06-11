const board = document.getElementById("gameBoard");

function createBoard() {

    board.innerHTML = "";

    board.className = "board";

    switch (gameState.difficulty) {

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

    let cards = [...themes[gameState.theme]]
        .slice(0, gameState.totalPairs);

    cards = [...cards, ...cards];

    shuffle(cards);

    gameState.board = cards;

    cards.forEach((icon, index) => {

        const card = document.createElement("div");

        card.className = "card";

        card.dataset.icon = icon;

        card.dataset.index = index;

        card.innerHTML = `

            <div class="front">
                ${icon}
            </div>

            <div class="back">
                ?
            </div>

        `;

        card.addEventListener("click", flipCard);

        board.appendChild(card);

    });

}