const randomNumber = getRandom(1, 101);
// alert(randomNumber);
const guesses = [];
const guess = document.getElementById("guess");
const submit = document.getElementById("submitButton");
const form = document.getElementById("guessForm");

// Enter does nothing
form.addEventListener("submit", e => {
    e.preventDefault();
});

// Random number generator
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Function to show guesses
function checkGuess(value) {
    // Show result section if not displayed
    const prevGuesses = document.getElementById("prevGuesses");
    const resultBanner = document.getElementById("resultBanner");
    const result = document.getElementById("result");
    if(prevGuesses.style.display !== "block") prevGuesses.style.display = "block";
    if(resultBanner.style.display !== "block") resultBanner.style.display = "block";

    // Append value to previous guesses
    prevGuesses.textContent += " " + value;

    // Check if the guess matches
    if(value == randomNumber) {
        // Change banner & result
        resultBanner.style.backgroundColor = "green";
        resultBanner.textContent = "Congratulations! You got it right!";
        result.style.display = "none";        

        // Show replay button
        document.getElementById("replayButton").style.display = "block";

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

// Get Guess function
function getGuess() {
    const value = guess.value;
    guess.value = "";
    if(!value || guesses.length > 10) alert("Please enter a valid guess!");
    else {
        guesses.push(value);
        let r = checkGuess(value);
        if(r === true || guesses.length === 10) {
            submit.disabled = true;
            guess.disabled = true;
            submit.removeEventListener("click", getGuess);

            // Game over guess is incorrect
            if(r === false) gameOver();

        }
    }
    guess.focus();
}

// Main
submit.addEventListener("click", getGuess);
document.getElementById("replayButton").addEventListener("click", () => {
    window.location.reload();
});
