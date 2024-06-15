// HTML Elements
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton =  document.getElementById('start');
const gameOverSign =  document.getElementById('gameOver');

// Game Settings
const boardSize = 10;
const gameSpeed = 120;
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2,
};
const directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1,
};

// Game Variables
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

// Draw the entire snake
const drawSnake = () => {
    snake.forEach( square => drawSquare(square, 'snakeSquare'))
};

// Fill in each square on the board
// @params => Parameters
// square: square position,
// type: square type(emptySquare, snakeSquare, foodSquare)
// Draw a square on the board
const drawSquare = (square, type) => {
    const [row, column] = square.split('');
    boardSquares[row][column] = squareTypes[type];
    const squareElement =  document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);

    // Update empty squares list
    if(type === 'emptySquare'){
        emptySquares.push(square);
    } else {
        if(emptySquares.indexOf(square) !== 1){
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }
};

// Update the score display
const updateScore = () => {
    scoreBoard.innerHTML = score
};

// Move the snake
const moveSnake = () => {
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions[direction])
        .padStart(2, '0');
    const [row, column] = newSquare.split('');
    
    // Check if the game is over
    if (newSquare < 0 || 
        newSquare > boardSize * boardSize ||
        (direction === 'ArrowRight' && column == 0) ||
        (direction === 'ArrowLeft' && column == 9 ||
        boardSquares[row][column] === squareTypes.snakeSquare)) {
        gameOver();
    } else {
        snake.push(newSquare);
        if (boardSquares[row][column] === squareTypes.foodSquare) {
            addFood();
        } else {
            const emptySquare = snake.shift();
            drawSquare(emptySquare, 'emptySquare');
        }
        drawSnake();
    }
};

// Add food to the board
const addFood = () => {
    score++;
    updateScore();
    createRandomFood();
};

// Handle game over
const gameOver = () =>{
    gameOverSign.style.display = 'flex';
    gameOverSign.style.justifyContent = 'center';
    gameOverSign.style.alignItems = 'center';
    clearInterval(moveInterval);
    startButton.disabled = false;
    if(!startButton.disabled){
        startButton.style.backgroundColor = ''
    }
};

// Set the direction of the snake
const setDirection = (newDirection) =>{
    direction = newDirection;
};

// Handle direction change event
const directionEvent = (key) => {
    switch(key.code){
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection(key.code)
            break;
        case 'ArrowDown':
            direction != 'ArrowUp' && setDirection(key.code)
            break;
        case 'ArrowLeft':
            direction != 'ArrowRight' && setDirection(key.code)
            break;
        case 'ArrowRight':
            direction != 'ArrowLeft' && setDirection(key.code)
            break;
    }
};

// Create random food on the board
const createRandomFood = () => {
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    drawSquare(randomEmptySquare, 'foodSquare');
};

// Create the game board
const createBoard = () => {
    boardSquares.forEach( (row, rowIndex) => {
        row.forEach( (column, columnIndex) => {
            const squareValue = `${rowIndex}${columnIndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        });
    });
};

// Set up the game
const setGame = () => {
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(boardSize), () =>  new Array(boardSize).fill(squareTypes.emptySquare));
    console.log(boardSquares);
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
};

// Start the game
const startGame = () => {
    setGame();
    gameOverSign.style.display = 'none';
    startButton.disabled = true
    if(startButton.disabled){
        startButton.style.backgroundColor = 'gray'
    }
    
    drawSnake();
    updateScore();
    createRandomFood();
    document.addEventListener('keydown', directionEvent);
    moveInterval = setInterval( () => moveSnake(), gameSpeed);
};

// Add event listener to start button
startButton.addEventListener('click', startGame);