const ops = new Set(['-', '+', '*', '/', '=']);
let messageTimeout;

function addValue(val) {
    const display = document.calcForm.display;
    const lastChar = display.value.at(-1); // last character in the display
    const lastNumPart = display.value.split(/[-+*/=]/).at(-1); // last number part

    if (val === '.' && lastNumPart.includes('.')) {
        showMessage("A number already contains a decimal point.");
        return;
    }

    if (display.value === '0' && val !== '.') {
        display.value = val;
    }
    // If the last character is an operation and the value is '.', add '0.'
    else if (val === '.' && ops.has(lastChar)) {
         display.value += '0.';
    }
    else {
        display.value += val;
    }
}

function addOp(op) {
    const display = document.calcForm.display;
    const lastChar = display.value.at(-1);
    const isLastOp = ops.has(lastChar);

    if (lastChar === '.') {
        showMessage("Enter a number or remove the decimal point.");
        return;
    }

    if (isLastOp) {
        display.value = display.value.slice(0, -1) + op;
    }
    else {
        display.value += op;
    }
}

function clearDisplay() {
    document.calcForm.display.value = '0';
    clearMessage();
}

function backspace() {
    const display = document.calcForm.display;
    let currentVal = display.value;
    display.value = currentVal.substring(0, currentVal.length - 1);

    if (display.value === '') {
        display.value = '0';
    }
    clearMessage();
}

function calculate() {
    const display = document.calcForm.display;
    let expression = display.value;
    try {
        if (expression) {
            display.value = eval(expression);
        }
    } catch (error) {
        showMessage("Invalid expression.");
        // clearDisplay();
    }
}

function showMessage(msg, duration = 2000) {
    const messageArea = document.getElementById('messageArea');
    if (messageArea) {
        messageArea.textContent = msg;
        messageArea.style.visibility = 'visible';
        messageArea.style.opacity = '1';
        messageArea.style.pointerEvents = 'auto';

        if (messageTimeout) {
            clearTimeout(messageTimeout);
        }

        // hide the message
        messageTimeout = setTimeout(() => {
            clearMessage();
        }, duration);
    }
}

function clearMessage() {
     const messageArea = document.getElementById('messageArea');
     if (messageArea) {
        messageArea.style.visibility = 'hidden';
        messageArea.style.opacity = '0';
        messageArea.style.pointerEvents = 'none'
        messageArea.textContent = '';
     }
     if (messageTimeout) {
        clearTimeout(messageTimeout);
        messageTimeout = null;
     }
}

// Initially hide the message
document.addEventListener('DOMContentLoaded', (event) => {
    clearMessage();
    const display = document.calcForm.display;
    if (display.value === '') {
        display.value = '0';
    }
});
