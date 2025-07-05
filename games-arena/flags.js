const flags = [
  {
    country: "France",
    img: "https://flagcdn.com/w320/fr.png",
    options: ["Italy", "France", "Russia", "Netherlands"]
  },
  {
    country: "Japan",
    img: "https://flagcdn.com/w320/jp.png",
    options: ["China", "Korea", "Japan", "Vietnam"]
  },
  {
    country: "India",
    img: "https://flagcdn.com/w320/in.png",
    options: ["Ireland", "India", "Mexico", "Italy"]
  },
  {
    country: "Brazil",
    img: "https://flagcdn.com/w320/br.png",
    options: ["Argentina", "Brazil", "Spain", "Portugal"]
  },
  {
    country: "Canada",
    img: "https://flagcdn.com/w320/ca.png",
    options: ["Canada", "USA", "UK", "Germany"]
  }
];

let current = 0;
let score = 0;

function loadFlag() {
  const flagImg = document.getElementById("flag");
  const optionsDiv = document.getElementById("options");
  const flag = flags[current];

  flagImg.src = flag.img;
  optionsDiv.innerHTML = "";

  flag.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = flags[current].country;
  if (selected === correct) {
    score++;
    document.getElementById("score").textContent = score;
    alert("✅ Correct!");
    setTimeout(() => {
      nextFlag();
    }, 1000);
  } else {
    alert("❌ Wrong! It was " + correct);
  }
}

function nextFlag() {
  current = (current + 1) % flags.length;
  loadFlag();
}

window.onload = loadFlag;
