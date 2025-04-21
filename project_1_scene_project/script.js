const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "images/background.jpg";

const hiker = new Image();
hiker.src = "images/hiker.png";

const bird = new Image();
bird.src = "images/bird.png";

let imagesLoaded = 0;
const totalImages = 3;

function drawScene() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(hiker, 100, 300, 200, 300);
  ctx.drawImage(bird, 550, 100, 100, 100);

  ctx.font = "28px Georgia";
  ctx.fillStyle = "white";
  ctx.fillText("Ali Fares", 30, 40);
  ctx.fillText("Peaceful Nature Scene", 30, 80);
}

function onImageLoad() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    drawScene();
  }
}

background.onload = onImageLoad;
hiker.onload = onImageLoad;
bird.onload = onImageLoad;
