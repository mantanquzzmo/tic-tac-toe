const x_class = "x";
const circle_class = "circle";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessageElement = document.getElementById("winningMessage");
const cellElements = document.querySelectorAll("[data-cell]");
const restartButton = document.getElementById('restartButton')
const board = document.getElementById("board");
let playerTurn;

playGame();

restartButton.addEventListener('click', playGame)

function playGame() {
  playerTurn = true;
  cellElements.forEach(cell => {
    cell.classList.remove(x_class)
    cell.classList.remove(circle_class)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = playerTurn ? x_class : circle_class;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurn();
    setBoardHoverClass();
  }
}

//placeMark
//Check for win
//check for draw
//change turn
// call on computerMove

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurn() {
  playerTurn = !playerTurn;
}

function setBoardHoverClass() {
  board.classList.remove(x_class);
  board.classList.remove(circle_class);
  if (playerTurn) {
    board.classList.add(x_class);
  } else {
    board.classList.add(circle_class);
  }
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerHTML = `${
      playerTurn ? "Player" : "Computer"
    } Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
  })
}