/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


/*---------------------------- Variables (state) ----------------------------*/

let board = ['', '', '', '', '', '', '', '', ''];
let turn = 'X';
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/

const updateBoard = () => {
    board.forEach((cell, index) => {
        if (cell === 'X') {
            squareEls[index].innerText = 'X';
        } else if (cell === 'O') {
            squareEls[index].innerText = 'O';
        } else if (cell === '') {
            squareEls[index].innerText = '';
        }
    })
};

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.innerText = `No winner yet, game is in progress. ${turn} player's turn`;
    } else if (tie === true) {
        messageEl.innerText = "It's a tie!";
    } else {
        messageEl.innerText = `${turn} player wins!`;
    }
};

const render = () => {
    updateBoard();
    updateMessage();
};

const init = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
};

const placePiece = (index) => {
    board[index] = turn;
};

const checkForWinner = () => {
    winningCombos.forEach((win) => {
        if (board[win[0]] && board[win[0]] === board[win[1]] && board[win[1]] === board[win[2]]) {
            winner = true;
        }
    })
};

const checkForTie = () => {
    if (winner === true) {
        return;
    } else if (!board.includes('')) {
        tie = true;
    }
};

const switchPlayerTurn = () => {
    if (winner === true) {
        return;
    } else {
        if (turn === 'X') {
            turn = 'O';
        } else {
            turn = 'X';
        }
    }
};

const handleClick = (event) => {
    const squareIndex = event.target.id;
    if (event.target.innerText === 'X' || event.target.innerText === 'O' || winner === true) {
        return;
    } else {
        placePiece(squareIndex);
        checkForWinner();
        checkForTie();
        switchPlayerTurn();
        render();
    }
};

init();
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((sqr) => {
    sqr.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);
