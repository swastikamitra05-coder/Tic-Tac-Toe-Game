let userScore = 0;
let computerScore = 0;
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function makeMove(index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = "X";
    updateBoard();

    if (checkWinner()) return;

    setTimeout(aiMove, 500);
}

function aiMove() {
    if (!gameActive) return;

    let emptyCells = [];

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            emptyCells.push(i);
        }
    }

    if (emptyCells.length === 0) return;

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomIndex] = "O";
    updateBoard();

    checkWinner();
}

function updateScore() {
    document.getElementById("user-score").innerText = userScore;
    document.getElementById("computer-score").innerText = computerScore;
}

function updateBoard() {
    let cells = document.getElementsByClassName("cell");

    for (let i = 0; i < board.length; i++) {
        cells[i].innerText = board[i];
    }
}

function checkWinner() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {

            gameActive = false;

            if (board[a] === "X") {
                userScore++;
                document.getElementById("status").innerText = "You Win!";
            } else {
                computerScore++;
                document.getElementById("status").innerText = "Computer Wins!";
            }

            updateScore();
            return true;
        }
    }

    if (!board.includes("")) {
        document.getElementById("status").innerText = "It's a Draw!";
        gameActive = false;
        return true;
    }

    return false;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    document.getElementById("status").innerText = "Your Turn";

    let cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.innerText = "";
    }
}