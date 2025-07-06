const canvas = document.getElementById("flappyCanvas");
const ctx = canvas.getContext("2d");

const groundHeight = 60;
let frame = 0;

let bird = {
  x: 60,
  y: 150,
  radius: 15,
  gravity: 0.6,
  lift: -10,
  velocity: 0
};

let pipes = [];
let score = 0;
let gameOver = false;

let clouds = [
  { x: 100, y: 60, size: 20 },
  { x: 300, y: 40, size: 25 }
];

document.addEventListener("keydown", () => {
  if (!gameOver) {
    bird.velocity = bird.lift;
  } else {
    resetGame();
  }
});

function drawBackground() {
  // Sky
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Clouds
  ctx.fillStyle = "white";
  clouds.forEach(cloud => {
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
    ctx.arc(cloud.x + 20, cloud.y - 10, cloud.size + 5, 0, Math.PI * 2);
    ctx.arc(cloud.x + 40, cloud.y, cloud.size, 0, Math.PI * 2);
    ctx.fill();
    cloud.x -= 0.5;
    if (cloud.x < -50) cloud.x = canvas.width + 50;
  });

  // Ground
  ctx.fillStyle = "#654321";
  ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

function drawBird() {
  // Body
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
  ctx.fill();

  // Eye
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(bird.x + 5, bird.y - 6, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(bird.x + 6, bird.y - 6, 2, 0, Math.PI * 2);
  ctx.fill();

  // Beak
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.moveTo(bird.x + 10, bird.y);
  ctx.lineTo(bird.x + 18, bird.y - 3);
  ctx.lineTo(bird.x + 18, bird.y + 3);
  ctx.closePath();
  ctx.fill();

  // Wing
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.ellipse(bird.x - 10, bird.y, 7, 10, Math.PI / 4, 0, 2 * Math.PI);
  ctx.fill();
}

function drawPipes() {
  pipes.forEach(pipe => {
    // Main pipes
    ctx.fillStyle = "green";
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom - groundHeight, pipe.width, pipe.bottom);

    // Top caps
    ctx.fillStyle = "#006400";
    ctx.fillRect(pipe.x - 2, pipe.top - 10, pipe.width + 4, 10);
    ctx.fillRect(pipe.x - 2, canvas.height - pipe.bottom - groundHeight, pipe.width + 4, 10);
  });
}

function updatePipes() {
  if (frame % 90 === 0) {
    let gap = 130;
    let top = Math.floor(Math.random() * (canvas.height - gap - groundHeight - 100)) + 50;
    let bottom = canvas.height - gap - top - groundHeight;

    pipes.push({
      x: canvas.width,
      width: 50,
      top: top,
      bottom: bottom,
      passed: false
    });
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;

    // Collision detection
    if (
      bird.x + bird.radius > pipe.x &&
      bird.x - bird.radius < pipe.x + pipe.width &&
      (bird.y - bird.radius < pipe.top ||
       bird.y + bird.radius > canvas.height - pipe.bottom - groundHeight)
    ) {
      gameOver = true;
    }

    if (!pipe.passed && pipe.x + pipe.width < bird.x) {
      pipe.passed = true;
      score++;
      document.getElementById("score").textContent = score;
    }
  });

  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

function draw() {
  drawBackground();
  drawBird();
  drawPipes();

  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.radius > canvas.height - groundHeight || bird.y - bird.radius < 0) {
    gameOver = true;
  }

  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "48px Amatic SC";
    ctx.fillText("Game Over", 120, 250);
    ctx.font = "24px Amatic SC";
    ctx.fillText("Press any key to restart", 90, 290);
    return;
  }

  updatePipes();
  frame++;
  requestAnimationFrame(draw);
}

function resetGame() {
  bird.y = 150;
  bird.velocity = 0;
  pipes = [];
  score = 0;
  frame = 0;
  gameOver = false;
  document.getElementById("score").textContent = "0";
  draw();
}

draw();
 