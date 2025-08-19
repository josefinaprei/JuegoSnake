// Elementos HTML
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');

// Settings
const boardSize = 10;
document.getElementById("board").style.setProperty("--board-size", boardSize);
const gameSpeed = 120;
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
    const [row, column] = square.split('-').map(Number);
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


/* const moveSnake = () => {
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions[direction])
        .padStart(2, '0');
        const [row, column] = newSquare.split('-');
    if (newSquare<0 ||
        newSquare > boardSize * boardSize ||
        (direction === 'ArrowRight' && column == 0) ||
        (direction === 'ArrowLeft' && column == boardSize - 1) ||
        boardSquares[row][column] === squareTypes.snake) {
            gameOver();
        } else {
            snake.push(newSquare);
            if (boardSquares[row][column] === squareTypes.food) {
                addFood();
            } else {
                const emptySquare = snake.shift();
                drawSquare(emptySquare, 'empty');
            }
            drawSnake();
        }      
} */

const moveSnake = () => {
    const[lastRow, lastCol] = snake[snake.length - 1].split('-').map(Number);
    let newRow = lastRow;
    let newCol = lastCol;
    switch(direction) {
        case 'ArrowUp':
            newRow--;
        break;
        case 'ArrowDown':
            newRow ++;
        break;
        case 'ArrowLeft':
            newCol--;
        break;
        case 'ArrowRight':
            newCol++;
        break;
    }

    if(newRow < 0  || newRow >= boardSize ||
         newCol < 0 || newCol >= boardSize ||
         boardSquares[newRow][newCol] === squareTypes.snake) {
          gameOver();
     } else {
        const newSquare = `${newRow}-${newCol}`;
        snake.push(newSquare);
        if (boardSquares[newRow][newCol] === squareTypes.food) {
            addFood();
        } else {
            const tailSquare = snake.shift();
            drawSquare(tailSquare, 'empty');
        }
        drawSnake();
     }
}

const gameOver = () => {
    gameOverSign.style.display = 'block';
    clearInterval(moveInterval);
    startButton.innerHTML = 'Reintentar';
    startButton.hidden = false;
}

const addFood = () => {
    score++;
    updateScore();
    createRandomFood();
}

const createRandomFood = () => {
    if (emptySquares.length > 0) {
        const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        drawSquare(randomEmptySquare, 'food');    
    }
}

const updateScore = () => {
    scoreBoard.innerHTML = `Score: ${score - 4}`;
}

const setDirection = newDirection => {
    direction = newDirection;
}

const directionEvent = key => {
    switch(key.code) {
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection(key.code);
        break;
        case 'ArrowDown':
            direction != 'ArrowUp' && setDirection(key.code);
        break;
        case 'ArrowLeft':
            direction != 'ArrowRight' && setDirection(key.code);
        break;
        case 'ArrowRight':
            direction != 'ArrowLeft' && setDirection(key.code);
        break;
    }
}

createBoard = () => {
    boardSquares.forEach((row, rowIndex) => {
    row.forEach( (column, columnIndex) => {
        const squareValue = `${rowIndex}-${columnIndex}`;
        const squareElement = document.createElement('div');
        squareElement.setAttribute('class', 'square emptySquare');
        squareElement.setAttribute('id', squareValue);
        board.appendChild(squareElement);
        emptySquares.push(squareValue);
    })
    })
}

const setGame = () => {
    snake = ['0-0', '0-1', '0-2', '0-3'];
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
    gameOverSign.style.display = 'none';
    startButton.hidden = true;
    drawSnake();
    updateScore();
    createRandomFood();
    document.addEventListener('keydown', directionEvent);
    moveInterval = setInterval( () => moveSnake(), gameSpeed);
}

startButton.addEventListener('click', startGame);