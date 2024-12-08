let inputDisplay = document.getElementById('input-display');
let outputDisplay = document.getElementById('output-display');
let currentInput = '';
let previousInput = '';
let operation = '';
let calculatorOn = false;

function appendNumber(number) {
    if (calculatorOn) {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplays();
    }
}

function setOperation(op) {
    if (calculatorOn) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate(); 
        }
        operation = op;
        previousInput = currentInput; 
        currentInput = ''; 
        updateDisplays();
    }
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = ''; 
    outputDisplay.innerText = result; 
    inputDisplay.innerText = previousInput + ' ' + operation + ' ' + current; 
    operation = '';
    previousInput = '';
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = '';
    updateDisplays();
}

function updateDisplays() {
    inputDisplay.innerText = currentInput || '0'; 
    if (!currentInput && !previousInput) {
        outputDisplay.innerText = '0';
    }
}

function toggleCalculator(state) {
    calculatorOn = state;
    if (state) {
        clearDisplay();
        inputDisplay.innerText = '0';
        outputDisplay.innerText = '0';
    } else {
        inputDisplay.innerText = '';
        outputDisplay.innerText = '';
    }
}

document.getElementById('on-button').addEventListener('click', () => toggleCalculator(true));
document.getElementById('off-button').addEventListener('click', () => toggleCalculator(false));



