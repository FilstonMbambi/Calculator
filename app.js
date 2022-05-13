// Calculator

// DOM elements
const topDisplay = document.querySelector("#top");
const bottomDisplay = document.querySelector("#bottom");
const allClear = document.querySelector("#clear");
const del = document.querySelector("#del");
const numbers = document.querySelectorAll("#btn-num");
const operations = document.querySelectorAll("#btn-ops");
const equals = document.querySelector("#equals");
const decimal = document.querySelector("#decimal");

// equation variables
let firstNum, operator, secondNum;

// Clear screen
function clear() {
    topDisplay.textContent = "";
    bottomDisplay.textContent = 0;
    equals.classList.remove("clicked");
    del.classList.remove("clicked");
}

allClear.addEventListener("click", clear);

// Delete
function deleteNum() {
    bottomDisplay.textContent = bottomDisplay.textContent.substring(0, bottomDisplay.textContent.length - 1);
    if (bottomDisplay.textContent === "") bottomDisplay.textContent = "0";
}

del.addEventListener("click", deleteNum);

// Print numbers on screen
function printNum(num) {
    if (equals.classList.contains("clicked")) {
        topDisplay.textContent = "";
        bottomDisplay.textContent = num;
        equals.classList.remove("clicked");
        del.classList.remove("clicked");
    }else if (bottomDisplay.textContent === "0") {
        bottomDisplay.textContent = "";
        bottomDisplay.textContent += num;
    } else bottomDisplay.textContent += num;
}

numbers.forEach((number) => {
    number.addEventListener("click", () => printNum(number.textContent))
})

// Decimal
decimal.addEventListener("click", appendDec)

function appendDec() {
    if (bottomDisplay.textContent === '')
      bottomDisplay.textContent = '0'
    if (bottomDisplay.textContent.includes('.')) return
    if (equals.classList.contains("clicked")) return
    bottomDisplay.textContent += '.'
  }

// Operations
function setOperator(operator) {
    if (equals.classList.contains("clicked")) {
        topDisplay.textContent = "";
        topDisplay.textContent += `${bottomDisplay.textContent} ${operator} `;
        bottomDisplay.textContent = "0"
        equals.classList.remove("clicked");
        del.classList.remove("clicked");
    }   else {
            topDisplay.textContent += bottomDisplay.textContent;
            bottomDisplay.textContent = "0";
            topDisplay.textContent += ` ${operator} `;
    }
}

operations.forEach((operation) => {
    operation.addEventListener("click", () => setOperator(operation.textContent))
})

// Equals
function evaluate() {
    if (equals.classList.contains("clicked") || topDisplay.textContent === "") return
    else {
        topDisplay.textContent += bottomDisplay.textContent;
        bottomDisplay.textContent = Math.round(solveEquation(topDisplay.textContent) * 1000) / 1000;
        equals.classList.add("clicked");
        del.classList.add("clicked");
    }
}

equals.addEventListener("click", evaluate)

// Perform calculations
function calculate(firstNum, operator, secondNum) {
    firstNum = Number(firstNum);
	secondNum = Number(secondNum);

    if (operator === '+') return firstNum + secondNum;
    if (operator === '-') return firstNum - secondNum;
    if (operator === 'x') return firstNum * secondNum;
    if (operator === '÷') return firstNum / secondNum;
}

// Handle equation
function solveEquation(equation) {
   const operators = ["÷", "x", "+", "-"];
   equation = equation.split(" ");
   let firstNum;
   let secondNum;
   let operator;
   let operatorIndex;
   let result;

   // Loop through operators array to calculate using BODMAS
   for (var i = 0; i < operators.length; i++) {
    while (equation.includes(operators[i])) {
        operatorIndex = equation.findIndex(item => item === operators[i]);
        firstNum = equation[operatorIndex-1];
        operator = equation[operatorIndex];
        secondNum = equation[operatorIndex+1];
        result = calculate(firstNum, operator, secondNum);
        equation.splice(operatorIndex - 1, 3, result); // after calculation of 1st numbers replace them with result
    }
}
   return result;
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key >= 0 && e.key <= 9) printNum(e.key)
    if (e.key === '.') appendDec()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNum()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperator(convertOperator(e.key));
});

// Convert keyboard operator
function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return 'x'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '+') return '+'
  }