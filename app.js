// Calculator

// DOM elements
const topDisplay = document.querySelector("#top");
const bottomDisplay = document.querySelector("#bottom");
const allClear = document.querySelector("#clear");
const del = document.querySelector("#del");
const numbers = document.querySelectorAll("#btn-num");
const operations = document.querySelectorAll("#btn-ops");

// equation variable
let equation = "";

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
// equation += topDisplay.textContent;
// console.log(equation);

// Operations
operations.forEach((operation) => {
    operation.addEventListener("click", () => {
        topDisplay.textContent += ` ${operation.textContent} `;
    })
})
equation += topDisplay.textContent;
console.log(equation)

// Perform calculations
function calculate(firstNumber, operator, secondNumber) {

	firstNumber = Number(firstNumber);
	secondNumber = Number(secondNumber);

    if (operator === 'plus' || operator === '+') return firstNumber + secondNumber;
    if (operator === 'minus' || operator === '-') return firstNumber - secondNumber;
    if (operator === 'multiply' || operator === 'x') return firstNumber * secondNumber;
    if (operator === 'divide' || operator === '/') return firstNumber / secondNumber;
    if (operator === 'remainder' || operator === '%') return firstNumber % secondNumber;
}

// function handleEquation(equation) {

// 	equation = equation.split(" ");
// 	const operators = ['/', 'x', '%', '+', '-'];
// 	let firstNumber;
// 	let secondNumber;
// 	let operator;
// 	let operatorIndex;
// 	let result;

// 	/*  
// 		1. Perform calculations as per BODMAS Method
// 		2. For that use operators array
// 		3. after calculation of 1st numbers replace them with result
// 		4. use splice method

// 	*/
// 	for (var i = 0; i < operators.length; i++) {
// 		while (equation.includes(operators[i])) {
// 			operatorIndex = equation.findIndex(item => item === operators[i]);
// 			firstNumber = equation[operatorIndex-1];
// 			operator = equation[operatorIndex];
// 			secondNumber = equation[operatorIndex+1];
// 			result = calculate(firstNumber, operator, secondNumber);
// 			equation.splice(operatorIndex - 1, 3, result);
// 		}
// 	}

// 	return result;
// }

// // Event Listener for keyboard button press
// document.addEventListener('keydown', (event) => {
	
// 	let getOperators = {
// 		'/': 'divide',
// 		'x': 'multiply',
// 		'*': 'multiply',
// 		'%': 'remainder',
// 		'+': 'plus',
// 		'-': 'minus'
// 	}

// 	if(!isNaN(event.key) && event.key !== ' '){
// 		document.getElementById(`digit-${event.key}`).click();
// 	}
// 	if (['/', 'x', '+', '-', '*', '%'].includes(event.key)) {
// 		document.getElementById(getOperators[event.key]).click();
// 	}
// 	if (event.key === 'Backspace' || event.key ==='c' || event.key === 'C') {
// 		document.getElementById('clear').click();	
// 	}
// 	if (event.key === '=' || event.key === 'Enter') {
// 		document.getElementById('equals').click();	
// 	}
// 	if (event.key === '.') {
// 		document.getElementById('decimal').click();	
// 	}
// });
