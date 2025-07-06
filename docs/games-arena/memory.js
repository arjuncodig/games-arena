const board = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");

const symbols = ["🍎", "🍌", "🍇", "🍓", "🍍", "🍉", "🥝", "🍒"];
let cards = [...symbols, ...symbols];
let flipped = [];
let lock = false;
let moves = 0;

shuffle(cards);

cards.forEach((symbol, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;
  card.dataset.index = index;
  card.innerHTML = "?";
  board.appendChild(card);

  card.addEventListener("click", () => {
    if (lock || card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    card.innerHTML = symbol;
    flipped.push(card);

    if (flipped.length === 2) {
      moves++;
      movesDisplay.textContent = moves;
      checkMatch();
    }
  });
});

function checkMatch() {
  const [first, second] = flipped;
  if (first.dataset.symbol === second.dataset.symbol) {
    flipped = [];
  } else {
    lock = true;
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      first.innerHTML = "?";
      second.innerHTML = "?";
      flipped = [];
      lock = false;
    }, 1000);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
