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
allClear.addEventListener("click", () => {
    topDisplay.textContent = "";
    bottomDisplay.textContent = 0;
    equals.classList.remove("clicked");
});

// Delete
del.addEventListener("click", () => {
    topDisplay.textContent =  topDisplay.textContent.substring(0, topDisplay.textContent.length - 1)
});

// Print numbers on screen
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (equals.classList.contains("clicked")) {
            topDisplay.textContent = "";
            bottomDisplay.textContent = number.textContent;
            equals.classList.remove("clicked");
        }else if (bottomDisplay.textContent === "0") {
            bottomDisplay.textContent = "";
            bottomDisplay.textContent += number.textContent;
        } else bottomDisplay.textContent += number.textContent;
    })
})

// Decimal
decimal.addEventListener("click", appendDec)

function appendDec() {
    if (bottomDisplay.textContent === '')
      bottomDisplay.textContent = '0'
    if (bottomDisplay.textContent.includes('.')) return
    bottomDisplay.textContent += '.'
  }

// Operations
operations.forEach((operation) => {
    operation.addEventListener("click", () => {
        if (equals.classList.contains("clicked")) {
            topDisplay.textContent = "";
            topDisplay.textContent += `${bottomDisplay.textContent}${operation.textContent}`;
            bottomDisplay.textContent = "0"
            equals.classList.remove("clicked");
        }   else {
            topDisplay.textContent += bottomDisplay.textContent;
            bottomDisplay.textContent = "0";
            topDisplay.textContent += `${operation.textContent}`;
        }
    })
})

// Equals
equals.addEventListener("click", () => {
    topDisplay.textContent += bottomDisplay.textContent;
    bottomDisplay.textContent = solveEquation(topDisplay.textContent);
    equals.classList.add("clicked");
})

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
   equation = equation.split("");
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
