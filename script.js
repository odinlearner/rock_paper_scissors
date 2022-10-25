const MOVES = {
    rock: { value: "Rock", id: 1 },
    paper: { value: "Paper", id: 2 },
    scissors: { value: "Scissors", id: 3 },
};

function getComputerChoice() {
    const randomIdx = Math.floor(Math.random() * 3);
    return Object.values(MOVES)[randomIdx];
}

function getPlayerChoice() {
    let move = "";

    while (true) {
        move = prompt("choose Rock/Paper/Scissors").trim().toLowerCase();
        if (/^(rock|paper|scissors)$/.test(move)) break;
    }

    return MOVES[move.toLowerCase()];
}

function playRound() {
    const computerSelection = getComputerChoice();
    const playerSelection = getPlayerChoice()

    console.log(`${playerSelection.value} (player) vs ${computerSelection.value} (CPU)`);

    const winner = (3 + playerSelection.id - computerSelection.id) % 3;
    return winner;
}

function game(n_rounds=5) {
    console.log(`Game started with ${n_rounds} rounds`);
    
    let score = { player: 0, cpu: 0, ties: 0 };
    for (let round = 1; round <= n_rounds; round++) {
        console.log(`Round ${round} / ${n_rounds}`);
        const winner = playRound();
        if (winner === 0) score.ties += 1;
        if (winner === 1) score.player += 1;
        if (winner === 2) score.cpu += 1;
    }

    console.log("Game ended");
    console.log("Score: ", score);
    if (score.player > score.cpu) console.log("Player won!");
    if (score.player < score.cpu) console.log("Computer won!");
    if (score.player === score.cpu) console.log("No winner");
}
