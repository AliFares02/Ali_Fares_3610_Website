const canvas = document.getElementById("ecoCanvas");
const ctx = canvas.getContext("2d");
const topicGrid = document.getElementById("topicGrid");
const topicTitle = document.getElementById("topicTitle");
const topicDescription = document.getElementById("topicDescription");
const topicAudio = document.getElementById("topicAudio");
const effectAudio = document.getElementById("effectAudio");
const installBtn = document.getElementById("installBtn");
const audioToggle = document.getElementById("audioToggle");
const quizBtn = document.getElementById("quizBtn");
const canvasOverlay = document.getElementById("canvasOverlay");

let currentTopic = null;
let topicsData = [];
let audioEnabled = true;
let deferredPrompt;

function drawCoral(x, y, size) {
  ctx.strokeStyle = "#f06292";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let i = 0; i < 5; i++) {
    const branchX = x + Math.cos((i * Math.PI) / 2.5) * size;
    const branchY = y - size - i * 5;
    ctx.lineTo(branchX, branchY);
    ctx.moveTo(x, y);
  }
  ctx.stroke();

  ctx.fillStyle = "#f8bbd0";
  ctx.beginPath();
  ctx.arc(x, y, size / 4, 0, Math.PI * 2);
  ctx.fill();
}

function drawOcean() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#1e88e5");
  gradient.addColorStop(1, "#0d47a1");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

  for (let i = 0; i < 5; i++) {
    const x = 100 + i * 150;
    const y = canvas.height / 2 + 50 + Math.random() * 50;
    drawFish(x, y);
  }

  drawCoral(50, canvas.height - 50, 30);
  drawCoral(canvas.width - 80, canvas.height - 70, 40);
}

function drawRecyclingSymbol(cx, cy, size) {
  ctx.fillStyle = "#388e3c";
  for (let i = 0; i < 3; i++) {
    const angle = (i * 120 * Math.PI) / 180;
    const x1 = cx + size * Math.cos(angle);
    const y1 = cy + size * Math.sin(angle);
    const x2 = cx + size * Math.cos(angle + Math.PI / 3);
    const y2 = cy + size * Math.sin(angle + Math.PI / 3);
    const x3 = cx + size * 0.6 * Math.cos(angle + Math.PI / 6);
    const y3 = cy + size * 0.6 * Math.sin(angle + Math.PI / 6);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.fill();
  }
}

function drawRecycling() {
  for (let i = 0; i < 3; i++) {
    const x = 100 + i * 150;
    drawBin(x, canvas.height - 100);
  }

  drawRecyclingSymbol(canvas.width / 2, 100, 40);
}

function initCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  drawBackground();
}

function drawBackground() {
  ctx.fillStyle = "#e8f5e9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#c8e6c9";
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 15 + 5;
    drawLeaf(x, y, size);
  }
}

function drawLeaf(x, y, size) {
  ctx.beginPath();
  ctx.ellipse(x, y, size, size * 1.5, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();
}

async function loadTopics() {
  try {
    const response = await fetch("data.json");
    topicsData = await response.json();
    renderTopics();
  } catch (error) {
    console.error("Error loading topics:", error);
  }
}

function renderTopics() {
  topicGrid.innerHTML = "";
  topicsData.topics.forEach((topic) => {
    const topicCard = document.createElement("div");
    topicCard.className = "col-md-4 col-sm-6";
    topicCard.innerHTML = `
            <div class="card topic-card mb-3" data-topic="${topic.id}">
                <img src="${topic.image}" class="card-img-top topic-img" alt="${topic.title}">
                <div class="card-body">
                    <h5 class="card-title">${topic.title}</h5>
                </div>
            </div>
        `;
    topicGrid.appendChild(topicCard);
  });

  document.querySelectorAll(".topic-card").forEach((card) => {
    card.addEventListener("click", () => showTopic(card.dataset.topic));
  });
}

function showTopic(topicId) {
  const topic = topicsData.topics.find((t) => t.id === topicId);
  if (!topic) return;

  currentTopic = topic;
  topicTitle.textContent = topic.title;
  topicDescription.textContent = topic.description;

  if (audioEnabled) {
    topicAudio.src = topic.audio;
    topicAudio.play().catch();
  }

  drawTopic(topic);

  playEffect("sounds/select.mp3");
}

function drawTopic(topic) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  switch (topic.id) {
    case "rainforest":
      drawRainforest();
      break;
    case "ocean":
      drawOcean();
      break;
    case "recycling":
      drawRecycling();
      break;
    default:
      drawGenericEco();
  }
}

function drawRainforest() {
  for (let i = 0; i < 5; i++) {
    const x = 100 + i * 150;
    const height = 100 + Math.random() * 50;
    drawTree(x, canvas.height - 50, height);
  }

  drawAnimal(200, canvas.height - 120, "monkey");
  drawAnimal(350, canvas.height - 150, "toucan");
}

function drawTree(x, y, height) {
  ctx.fillStyle = "#5d4037";
  ctx.fillRect(x - 10, y - height, 20, height);

  ctx.fillStyle = "#2e7d32";
  ctx.beginPath();
  ctx.arc(x, y - height - 30, 40, 0, Math.PI * 2);
  ctx.fill();
}

function drawAnimal(x, y, type) {
  if (type === "monkey") {
    ctx.fillStyle = "#795548";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y - 25, 10, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "toucan") {
    ctx.fillStyle = "#ffeb3b";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 30, y - 10);
    ctx.lineTo(x + 15, y);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawOcean() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#1e88e5");
  gradient.addColorStop(1, "#0d47a1");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

  for (let i = 0; i < 5; i++) {
    const x = 100 + i * 150;
    const y = canvas.height / 2 + 50 + Math.random() * 50;
    drawFish(x, y);
  }

  drawCoral(50, canvas.height - 50, 30);
  drawCoral(canvas.width - 80, canvas.height - 70, 40);
}

function drawFish(x, y) {
  ctx.fillStyle = "#ff9800";
  ctx.beginPath();
  ctx.ellipse(x, y, 20, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x - 20, y);
  ctx.lineTo(x - 35, y - 10);
  ctx.lineTo(x - 35, y + 10);
  ctx.fill();
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(x + 15, y - 3, 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawRecycling() {
  for (let i = 0; i < 3; i++) {
    const x = 100 + i * 150;
    drawBin(x, canvas.height - 100);
  }

  drawRecyclingSymbol(canvas.width / 2, 100, 40);
}

function drawGenericEco() {
  ctx.fillStyle = "#ffeb3b";
  ctx.beginPath();
  ctx.arc(canvas.width - 100, 100, 40, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#66bb6a";
  ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

  drawCloud(100, 80);
  drawCloud(300, 60);
}

function drawBin(x, y) {
  ctx.fillStyle = "#4caf50";
  ctx.fillRect(x - 25, y - 50, 50, 50);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(x, y - 40);
  ctx.lineTo(x + 10, y - 25);
  ctx.lineTo(x - 10, y - 25);
  ctx.closePath();
  ctx.fill();
}

function drawCloud(x, y) {
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.arc(x + 25, y - 10, 20, 0, Math.PI * 2);
  ctx.arc(x + 50, y, 20, 0, Math.PI * 2);
  ctx.fill();
}

function playEffect(soundFile) {
  if (!audioEnabled) return;
  const clone = effectAudio.cloneNode(true);
  clone.src = soundFile;
  clone.play().catch((e) => console.log("Effect play failed:", e));
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User response to the install prompt: ${outcome}`);
  deferredPrompt = null;
  installBtn.style.display = "none";
});

audioToggle.addEventListener("click", () => {
  audioEnabled = !audioEnabled;
  audioToggle.textContent = audioEnabled ? "Disable Audio" : "Enable Audio";
  if (!audioEnabled) {
    topicAudio.pause();
    effectAudio.pause();
  }
});

quizBtn.addEventListener("click", () => {
  if (!currentTopic) {
    alert("Please select a topic first");
    return;
  }
  startQuiz();
});

function startQuiz() {
  const questions = currentTopic.quiz || [
    {
      question: `How much did you learn about ${currentTopic.title}?`,
      options: ["A little", "Some", "A lot!"],
      answer: 2,
    },
  ];

  const q = questions[0];
  const userAnswer = prompt(
    `${q.question}\n\nOptions:\n${q.options.join("\n")}`
  );

  if (userAnswer !== null) {
    alert("Thanks for testing your knowledge!");
    playEffect("sounds/success.mp3");
  }
}

window.addEventListener("resize", () => {
  initCanvas();
  if (currentTopic) {
    drawTopic(currentTopic);
  }
});

function initApp() {
  initCanvas();
  loadTopics();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("sw.js")
        .then((registration) => {
          console.log("ServiceWorker registration successful");
        })
        .catch((err) => {
          console.log("ServiceWorker registration failed: ", err);
        });
    });
  }
}

initApp();
