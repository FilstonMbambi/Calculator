// Calculator

// DOM elements
const topDisplay = document.querySelector("#top");
const bottomDisplay = document.querySelector("#bottom");
const allClear = document.querySelector("#clear");
const del = document.querySelector("#del");
const numbers = document.querySelectorAll("#btn-num");
const operations = document.querySelectorAll("#btn-ops");
const equals = document.querySelector("#equals");

// Add event handlers on elements:

// Clear screen
allClear.addEventListener("click", () => {
    topDisplay.textContent = "";
    bottomDisplay.textContent = 0;
});

// Delete
del.addEventListener("click", () => {
    topDisplay.textContent =  topDisplay.textContent.substring(0, topDisplay.textContent.length - 1)
});

// Print numbers on screen
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        topDisplay.textContent += number.textContent;
    })
})

// Operations
operations.forEach((operation) => {
    operation.addEventListener("click", () => {
        topDisplay.textContent += `${operation.textContent}`;
    })
})

// Equals
equals.addEventListener("click", () => {
    bottomDisplay.textContent = handleEquation(topDisplay.textContent);
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

function handleEquation(equation) {
   const operators = ["÷", "x", "+", "-"];
   equation = equation.split("");
   let firstNum;
   let secondNum;
   let operator;
   let operatorIndex;
   let result;

   for (let i = 0; i < equation.length; i++) {
       for (let j = 0; j < operators.length; j++) {
            if (equation[i] === operators[j]) {
                operator = operators[j];
                operatorIndex = equation.indexOf(operator);
                firstNum = equation.slice(0, operatorIndex).join("");
                secondNum = equation.slice(operatorIndex + 1).join("");
                result = calculate(firstNum, operator, secondNum);
            }
        }
    }
   return result;
}

console.log(handleEquation("5025+3005"));