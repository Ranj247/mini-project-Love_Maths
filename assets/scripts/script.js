// Wait until the DOM has loaded before running the game
// Get the button elements, and add event listeners to them


document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for(let button of buttons) {
        button.addEventListener("click", function() {

            if(this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } 
            
            else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    document.getElementById("answer-box").addEventListener("keydown", function() {
        if(event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition"); // running the addition game as a default game
});


// The main game "loop", called when the script is first loaded
// and after the user's answer has been processed

function runGame(gameType) {
    // Generates two numbers with a value of between 1 and 25
    // Selects and displays the question depending on the gameType
    // which we set when we called the function

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;  

    if(gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type ${gameType}`);
        throw `Unknown game type ${gameType}, aborting!`;
    }
}


// Called when the user clicks the Submit button or presses Enter
function checkAnswer() {
    // checks the answer against the first element in 
    // the returned calculateCorrectAnswer array
    // calculatedAnswer = array [containing answer, game type] 

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer(); 
    let isCorrect = userAnswer === calculatedAnswer[0];

    if(isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    }
    else {
        alert(`Awwww....you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}



function calculateCorrectAnswer() {
    // Gets the operands (the numbers) and the operator (plus, minus sign etc.)
    // directly from the DOM
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") { // This is the addition game
        return [operand1 + operand2, "addition"]; // return an array containing answer and game type
    } else if (operator === "x") { // This is the multiply game
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") { // This is the subtract game
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") { // This is the division game
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator: ${operator}`);
        throw `Unimplemented operator: ${operator}, aborting`;
    }
}


function incrementScore() {
    // Gets the current score from the DOM and increments it

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

function incrementWrongAnswer() {
    // Gets the current tally of incorrect answers from the DOM and increments it

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}


// Displays the questions.
function displayAdditionQuestion(operand1, operand2) {

    // we set the values of operand 1 & 2 and operator below
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displayMultiplyQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displaySubtractQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1 > operand2? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2? operand2 : operand1;;
    document.getElementById("operator").textContent = "-";
}

function displayDivisionQuestion(operand1, operand2) {

    operand1 = operand1 * operand2
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";
}