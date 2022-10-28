const MAX_ROUNDS = 5;
const MOVES = {
    rock: { value: "Rock", id: 1 },
    paper: { value: "Paper", id: 2 },
    scissors: { value: "Scissors", id: 3 },
};
const DEFAULT_SCORE = { player: 0, cpu: 0, ties: 0, round: 0 };
let score;

function updateScoreBoard() {
    document.getElementById("player-score").innerText = score.player;
    document.getElementById("cpu-score").innerText = score.cpu;
    document.getElementById("current-round").innerText = score.round;
}

function endGame() {
    document.querySelectorAll("#moves button").forEach(el => el.disabled=true);
    
    const result = document.getElementById("result");
    result.innerText = getWinner();
    result.style.visibility = "";
}

function reset() {
    score = {...DEFAULT_SCORE};
    updateScoreBoard();
    document.getElementById("result").style.visibility = "hidden";
    document.getElementById("max-round").innerText = MAX_ROUNDS;
    document.querySelectorAll("#moves button").forEach(el => el.disabled=false);
}

function getComputerChoice() {
    const randomIdx = Math.floor(Math.random() * 3);
    return Object.values(MOVES)[randomIdx];
}

function playRound(move) {
    const computerSelection = getComputerChoice();
    const playerSelection = MOVES[move.toLowerCase()];

    const winner = (3 + playerSelection.id - computerSelection.id) % 3;
    if (winner === 0) score.ties += 1;
    if (winner === 1) score.player += 1;
    if (winner === 2) score.cpu += 1;
    score.round += 1;
    updateScoreBoard();
    
    if (score.round >= MAX_ROUNDS) endGame(); 
}

function getWinner() {
    if (score.player > score.cpu) return "Player won!";
    if (score.player < score.cpu) return "Computer won!";
    if (score.player === score.cpu) return "No winner";
}

reset();