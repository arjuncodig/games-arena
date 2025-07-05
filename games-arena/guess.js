let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
  const guess = Number(document.getElementById("guessInput").value);
  const message = document.getElementById("message");
  const attemptsDisplay = document.getElementById("attempts");

  if (!guess || guess < 1 || guess > 100) {
    message.textContent = "Enter a number between 1 and 100!";
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (guess === secretNumber) {
    message.textContent = `🎉 Correct! The number was ${secretNumber}`;
    message.style.color = "green";
  } else if (guess < secretNumber) {
    message.textContent = "📉 Too low!";
    message.style.color = "#ff5f6d";
  } else {
    message.textContent = "📈 Too high!";
    message.style.color = "#ff5f6d";
  }
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById("attempts").textContent = "0";
  document.getElementById("guessInput").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("message").style.color = "#333";
}
