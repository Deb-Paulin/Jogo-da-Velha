const cellElements = document.querySelectorAll('[data-cell]');
const container = document.querySelector('[data-container]');
const resultsMessageElement = document.querySelector('[data-results-message]');
const resultsMessage = document.querySelector('[data-results]');
const resultsRestart = document.querySelector('[data-results-restart]');

let isCircleTurn;

const resultCombinations = [
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
    results.classList.remove('.show-results');
  }

const endGame = (isDraw) => {
    if (isDraw) {
        resultsMessageElement.innerText = 'Empate!';
    } else {
        resultsMessageElement.innerText = isCircleTurn ? 'O Venceu!' : 'X Venceu!';
    }

    results.classList.add('.show-results');
}

const checkForWin = (currentPlayer) => {
    return resultCombinations.some((combination) => {
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

resultsRestart.addEventListener('click', startGame);