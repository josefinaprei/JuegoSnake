// Elementos HTML
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');

// Settings
const boardSize = 10;
const gameSpeed = 100;
const squareTypes = {
  empty: 0,
  snake: 1,
  food: 2
};

const directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowLeft: -1,
    ArrowRight: 1
};
// Variables del juego
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

const drawSnake = () => {
    snake.forEach(square => drawSquare(square, 'snake'));
}

const drawSquare = (square, type) => {
    const [row, column] = square.split('');
    boardSquares[row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `${type}Square`);

    if (type === 'empty') {
        emptySquares.push(square);
    } else {
        if(emptySquares.indexOf(square) !== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    } 
}

const updateScore = () => {
    scoreBoard.innerHTML = `Score: ${score - 4}`;
}

createBoard = () => {
    boardSquares.forEach((row, rowIndex) => {
    row.forEach( (column, columnIndex) => {
        const squareValue = `${rowIndex}${columnIndex}`;
        const squareElement = document.createElement('div');
        squareElement.setAttribute('class', 'square emptySquare');
        squareElement.setAttribute('id', squareValue);
        board.appendChild(squareElement);
        emptySquares.push(squareValue);
    })
    })
}

const setGame = () => {
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'ArrowRight';
    boardSquares = Array.from(
        Array(boardSize),
        () => new Array(boardSize).fill(squareTypes.empty));
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
}

const startGame = () => {
    setGame();
    gameOver.style.display = 'none';
    startButton.disabled = true;
    drawSnake();
    updateScore();
}

startButton.addEventListener('click', startGame);