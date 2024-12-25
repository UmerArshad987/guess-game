let secretNumber = Math.floor(Math.random() * 10) + 1;
let lives = 3;
let guesses = [];

document.getElementById("guess").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleGuess();
    }
});

function handleGuess() {
    const guessInput = document.getElementById("guess");
    const guess = parseInt(guessInput.value);
    const message = document.getElementById("message");
    const hearts = document.getElementById("hearts");
    const instructions = document.getElementById("instructions");

    if (!guess || guess < 1 || guess > 10) {
        message.textContent = "Please enter a valid number between 1 and 10.";
        return;
    }

    guesses.push(guess);

    if (guess === secretNumber) {
        instructions.textContent = "";
        message.textContent = `You're good! Your guess was ${guess}. The correct number was ${secretNumber}. 🎉 You win!`;
        message.classList.add("win-message");
        endGame(true);
        return;
    } else {
        lives--;
        hearts.textContent = "❤️".repeat(lives);

        if (lives === 0) {
            instructions.textContent = "";
            message.innerHTML = `<p class='loss-message'>You lost all your lives!</p>
                                 <p>Your guesses are: ${guesses.join(", ")}.</p>
                                 <p>The correct number is: ${secretNumber}.</p>
                                 <p>Better luck next time!</p>`;
            document.getElementById("input-container").classList.add("hidden");
            document.getElementById("restart").classList.remove("hidden");
        } else {
            instructions.textContent = `You have ${lives} ${lives === 1 ? 'chance' : 'chances'} to guess and win!`;
            message.textContent = "Incorrect! Try again.";
        }
    }

    guessInput.value = "";
}

function endGame(isWin) {
    document.getElementById("guess").disabled = true;
    document.querySelector("button[onclick='handleGuess()']").disabled = true;
    document.getElementById("restart").classList.remove("hidden");
}

function restartGame() {
    secretNumber = Math.floor(Math.random() * 10) + 1;
    lives = 3;
    guesses = [];
    document.getElementById("hearts").textContent = "❤️❤️❤️";
    document.getElementById("instructions").textContent = "You have three chances to guess and win!";
    document.getElementById("message").textContent = "Guess a number between 1 and 10!";
    document.getElementById("message").classList.remove("win-message", "loss-message");
    document.getElementById("input-container").classList.remove("hidden");
    document.getElementById("guess").disabled = false;
    document.querySelector("button[onclick='handleGuess()']").disabled = false;
    document.getElementById("restart").classList.add("hidden");
}