let score = 0;

function play(playerChoice) {
  const playerNum = Number(document.getElementById("playerNumber").value);
  const resultDisplay = document.getElementById("result");

  if (!playerNum || playerNum < 1) {
    resultDisplay.textContent = "Please enter a positive number!";
    return;
  }

  const computerNum = Math.floor(Math.random() * 100) + 1;
  const total = playerNum + computerNum;
  const result = total % 2 === 0 ? "even" : "odd";

  if (playerChoice === result) {
    score++;
    resultDisplay.textContent = `✅ You Win! ${playerNum} + ${computerNum} = ${total} (${result})`;
    resultDisplay.style.color = "green";
  } else {
    resultDisplay.textContent = `❌ You Lose! ${playerNum} + ${computerNum} = ${total} (${result})`;
    resultDisplay.style.color = "red";
  }

  document.getElementById("score").textContent = score;
}

function resetGame() {
  score = 0;
  document.getElementById("score").textContent = "0";
  document.getElementById("playerNumber").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("result").style.color = "#333";
}
