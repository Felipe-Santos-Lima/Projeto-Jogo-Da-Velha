const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElements = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const WinningCombinatios = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startgame = () => {
  isCircleTurn = false;
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }
  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElements.innerText = "Empate!";
  } else {
    winningMessageTextElements.innerText = isCircleTurn
      ? "Bolinha Venceu!"
      : "X Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};

const HandleRestartClick = () => {};

const CheckForWin = (currentPlayer) => {
  return WinningCombinatios.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};
const CheckForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};
function placeMark(cell, ClassToAdd) {
  cell.classList.add(ClassToAdd);
}

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");
  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurn = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
};

const handleClick = (e) => {
  const cell = e.target;
  const ClassToAdd = isCircleTurn ? "circle" : "x";
  placeMark(cell, ClassToAdd);

  //verificar por vitoria
  const isWin = CheckForWin(ClassToAdd);

  //verificar por empate
  const isDraw = CheckForDraw();
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    swapTurn();
  }
};
startgame();
restartButton.addEventListener("click", startgame);
