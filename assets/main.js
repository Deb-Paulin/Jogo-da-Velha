const cellElements = document.querySelectorAll('[data-cell]');
const container = document.querySelector('[data-container]');

let isCircleTurn = false;

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    container.classList.remove('circle');
    container.classList.remove('x');

    if (isCircleTurn) {
        container.classList.add('circle');
    } else {
        container.classList.add('x');
    }
};

const handleClick = () => {
    // Colocar a marca (X ou Círculo)
    const cell = Event.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    // Verificar por vitória
    // Verificar por empate 
    // Mudar símbolo
    swapTurns();
};

for (const cell of cellElements) {
    cell.addEventListener('click', handleClick, { once: true});
}