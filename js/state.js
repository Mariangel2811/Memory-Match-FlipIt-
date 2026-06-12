const gameState = {
    mode: "solo",
    difficulty: 4,
    theme: "animals",
    players: [{ name: "Jugador", score: 0 }],
    board: [],
    moves: 0,
    pairs: 0,
    totalPairs: 0,
    timer: 0,
    timerInterval: null,
    currentPlayer: 0,
    achievements: [],
    consecutiveMatches: 0
};