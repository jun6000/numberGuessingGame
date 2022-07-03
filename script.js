const guess = document.getElementById("guess"); // Guess field
const submit = document.getElementById("submitButton"); // Submit button
const form = document.getElementById("guessForm"); // Submit form consisting of guess field and submit button elements
const prevGuesses = document.getElementById("prevGuesses"); // Section that shows guesses so far
const resultBanner = document.getElementById("resultBanner"); // Result banner
const result = document.getElementById("result"); // Result message
let i = 10; // Max guesses (turns) allowed
const randomNumber = getRandom(1, 101);

// ENTER does nothing
form.addEventListener("submit", e => {
    e.preventDefault();
});

// Random number generator
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Game win function
function gameWin() {
    resultBanner.style.backgroundColor = "green";
    resultBanner.textContent = "Congratulations! You got it right!";
    result.style.display = "none";        

    document.getElementById("replayButton").style.display = "block"; // Show replay button
}

// Show result section
function showResult(value) {

    // Unhide hidden elements to show result
    if(prevGuesses.style.display !== "block") prevGuesses.style.display = "block";
    if(resultBanner.style.display !== "block") resultBanner.style.display = "block";

    prevGuesses.textContent += " " + value; // Append value to previous guesses
}

// Function to check guesses
function checkGuess(value) {
    showResult(value);
    
    if(value == randomNumber) {// Check if the guess matches
        gameWin(); // Change banner & result

        return true;
    }
    else {
        if(value > randomNumber) result.textContent = "Last guess was too high!";
        else if(value < randomNumber) result.textContent = "Last guess was too low!";
    }
    
    return false;
}

// Game Over function
function gameOver() {
    resultBanner.textContent = "!!!GAME OVER!!!";
    result.style.display = "none";

    // Show replay button
    document.getElementById("replayButton").style.display = "block";
}

// Disables submit button and guess field
function disableGuessing() {
    submit.disabled = true;
    guess.disabled = true;
    submit.removeEventListener("click", getGuess);
}

// Get Guess function
function getGuess() {
    const value = guess.value;
    guess.value = ""; // Resetting the guess field to blank
    if(!value) alert("Please enter a valid guess!");
    else {
        i--; // Decrement number of turns left
        let r = checkGuess(value);
        if(r === true || i === 0) {
            disableGuessing();
            if(r === false) gameOver(); // Game over if guess is incorrect and turns are over
        }
    }
    guess.focus(); // Refocus the guess field
}

// Main
submit.addEventListener("click", getGuess); // A guess is submitted on clicking the submit button
document.getElementById("replayButton").addEventListener("click", () => { // Reload page for new game
    window.location.reload();
});
