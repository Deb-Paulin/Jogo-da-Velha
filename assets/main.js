const cellElements = document.querySelectorAll('{data-cell}');

let isCircleTurn = false;

const handleClick = () => {
    // Colocar a marca (X ou Círculo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    cell.classList.add(classToAdd);
    // Verificar por vitória
    // Verificar por empate 
    // Mudar símbolo
};

for (const cell of cellElements) {
    cell.addEventListener('click', handleClick, { once: true});
}