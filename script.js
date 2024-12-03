const DEFAULT_COLOR = '#4a4a4a'; // New default color
const DEFAULT_MODE = 'color'; // Changed default mode to 'color'
const DEFAULT_SIZE = 20; // Changed grid size to 20

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const colorPicker = document.getElementById('color-picker');
const colorButton = document.getElementById('color-button');    
const rainbowButton = document.getElementById('rainbow-button');    
const eraserButton = document.getElementById('eraser-button');
const clearButton = document.getElementById('clear-button');
const sizeValue = document.getElementById('size-value');
const sizeSlider = document.getElementById('size-slider');  
const gridContainer = document.getElementById('grid');

colorPicker.addEventListener('input', (e) => updateColor(e.target.value));
colorButton.addEventListener('click', () => switchMode('color'));
rainbowButton.addEventListener('click', () => switchMode('rainbow'));
eraserButton.addEventListener('click', () => switchMode('eraser'));
clearButton.addEventListener('click', () => refreshGrid());

sizeSlider.addEventListener('input', (e) => {
    setSize(e.target.value);
});

sizeSlider.addEventListener('change', (e) => {
    sizeValue.textContent = `Grid Size: ${e.target.value} x ${e.target.value}`;
});

let isMouseDown = false;
document.body.addEventListener('mousedown', () => (isMouseDown = true));
document.body.addEventListener('mouseup', () => (isMouseDown = false));

function updateColor(color) {
    currentColor = color;
}

function switchMode(mode) {
    setButtonState(mode);
    currentMode = mode;
}

function adjustSize(size) {
    currentSize = size;
}

function setSize(value) {
    adjustSize(value);
    refreshGrid();
}

function refreshGrid() {
    clearGrid();
    generateGrid(currentSize);
}

function clearGrid() {
    gridContainer.innerHTML = '';
}

function generateGrid(size) {
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.addEventListener('mouseover', handleColorChange);
        cell.addEventListener('mousedown', handleColorChange);
        gridContainer.appendChild(cell);
    }
}

function handleColorChange(e) {
    if (e.type === 'mouseover' && !isMouseDown) return;

    if (currentMode === 'rainbow') {
        const randomColor = generateRandomColor();
        e.target.style.backgroundColor = randomColor;
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#ffffff';
    }
}

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function setButtonState(newMode) {
    const allButtons = [colorButton, rainbowButton, eraserButton];

    allButtons.forEach(button => button.classList.remove('active'));

    if (newMode === 'rainbow') {
        rainbowButton.classList.add('active');
    } else if (newMode === 'color') {
        colorButton.classList.add('active');
    } else if (newMode === 'eraser') {
        eraserButton.classList.add('active');
    }
}

window.onload = () => {
    generateGrid(DEFAULT_SIZE);
    setButtonState(DEFAULT_MODE);
};
