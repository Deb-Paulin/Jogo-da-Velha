const cellElements = document.querySelectorAll('[data-cell]');
const container = document.querySelector('[data-container]');
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  const startGame = () => {
    isCircleTurn = false;
  
    for (const cell of cellElements) {
      cell.classList.remove("circle");
      cell.classList.remove("x");
      cell.removeEventListener("click", handleClick);
      cell.addEventListener("click", handleClick, { once: true });
    }

    setContainerHoverClass();
    winningMessage.classList.remove("show-winning-message");
  }

  const endGame = (isDraw) => {
    if (isDraw) {
      winningMessageTextElement.innerText = "Empate!";
    } else {
      winningMessageTextElement.innerText = isCircleTurn
        ? "O Venceu!"
        : "X Venceu!";
    }
  
    winningMessage.classList.add("show-winning-message");
  };

  const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        return cellElements[index].classList.contains(currentPlayer);
      });
    });
  };
  
const checkForDraw = () => {
    return [...cellElements].every((cell) => {
      return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setContainerHoverClass = () => {
    container.classList.remove("circle");
    container.classList.remove("x");
  
    if (isCircleTurn) {
      container.classList.add("circle");
    } else {
      container.classList.add("x");
    }
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setContainerHoverClass();
};

const handleClick = (e) => {
    // Colocar a marca (X ou Círculo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    // Verificar por vitória
    const isWin = checkForWin(classToAdd);

    // Verificar por empate 
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true)
    } else {
    // Mudar símbolo
        swapTurns();
    }
};

startGame();

restartButton.addEventListener('click', startGame);