let playerScore = 0;
let computerScore = 0;

function play(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  const result = document.getElementById("result");

  let outcome = "";

  if (playerChoice === computerChoice) {
    outcome = `It's a draw! Both chose ${playerChoice}`;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    outcome = `🎉 You win! ${playerChoice} beats ${computerChoice}`;
  } else {
    computerScore++;
    outcome = `💥 You lose! ${computerChoice} beats ${playerChoice}`;
  }

  result.textContent = outcome;
  document.getElementById("playerScore").textContent = playerScore;
  document.getElementById("computerScore").textContent = computerScore;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  document.getElementById("playerScore").textContent = "0";
  document.getElementById("computerScore").textContent = "0";
  document.getElementById("result").textContent = "";
}
