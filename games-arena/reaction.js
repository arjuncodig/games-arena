let startTime, timeout;
let waiting = false;
let green = false;

let globalBest = localStorage.getItem("globalHigh") || null;
let personalBest = localStorage.getItem("personalBest") || null;

function startGame() {
  const box = document.getElementById("gameBox");
  const msg = document.getElementById("message");
  const result = document.getElementById("result");

  msg.textContent = "Wait for green...";
  result.textContent = "";
  box.style.backgroundColor = "red";

  waiting = true;
  green = false;

  const delay = Math.random() * 3000 + 2000;

  timeout = setTimeout(() => {
    box.style.backgroundColor = "green";
    msg.textContent = "CLICK!";
    startTime = new Date().getTime();
    green = true;
  }, delay);
}

function handleClick() {
  const result = document.getElementById("result");
  const msg = document.getElementById("message");

  if (!waiting) return;

  if (!green) {
    clearTimeout(timeout);
    document.getElementById("gameBox").style.backgroundColor = "#444";
    msg.textContent = "Too Soon!";
    result.innerHTML = "❌ You clicked before it turned green!";
    waiting = false;
  } else {
    const endTime = new Date().getTime();
    const reactionTime = endTime - startTime;
    msg.textContent = "Done!";
    result.innerHTML = `
      ⏱ Your reaction time: <strong>${reactionTime} ms</strong><br>
    `;

    updateScores(reactionTime);
    waiting = false;
  }
}

function updateScores(time) {
  const result = document.getElementById("result");

  let updated = false;

  // Personal best (localStorage)
  let best = localStorage.getItem("personalBest");
  if (!best || time < best) {
    localStorage.setItem("personalBest", time);
    best = time;
    updated = true;
  }

  // Simulated Global Best
  let global = localStorage.getItem("globalHigh");
  if (!global || time < global) {
    localStorage.setItem("globalHigh", time);
    global = time;
    updated = true;
  }

  result.innerHTML += `
    🌟 Your best: <strong>${best} ms</strong><br>
    🌍 Global best: <strong>${global} ms</strong>
  `;

  if (updated) {
    console.log("High score updated");
  }
}

// Show scores immediately
window.onload = () => {
  const result = document.getElementById("result");
  const best = localStorage.getItem("personalBest");
  const global = localStorage.getItem("globalHigh");
  if (best || global) {
    result.innerHTML = `
      🌟 Your best: <strong>${best || "—"} ms</strong><br>
      🌍 Global best: <strong>${global || "—"} ms</strong>
    `;
  }
};
