const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let bgIndex = 1;
let characterX = 200;

const bgImages = [null, new Image(), new Image(), new Image()];
bgImages[1].src = "images/bg1.jpg";
bgImages[2].src = "images/bg2.jpg";
bgImages[3].src = "images/bg3.jpg";

const character = new Image();
character.src = "images/character.png";

const items = [
  { img: new Image(), x: 50, y: 150, visible: false },
  { img: new Image(), x: 250, y: 150, visible: false },
  { img: new Image(), x: 425, y: 150, visible: false },
];
items[0].img.src = "images/item1.png";
items[1].img.src = "images/item2.png";
items[2].img.src = "images/item3.png";

// Event Listeners
document.querySelectorAll("input[name='bg']").forEach((radio) => {
  radio.addEventListener("change", (e) => {
    bgIndex = parseInt(e.target.value);
    drawScene();
  });
});

document.getElementById("slider").addEventListener("input", (e) => {
  characterX = parseInt(e.target.value);
  drawScene();
});

document.getElementById("item1").addEventListener("change", (e) => {
  items[0].visible = e.target.checked;
  drawScene();
});
document.getElementById("item2").addEventListener("change", (e) => {
  items[1].visible = e.target.checked;
  drawScene();
});
document.getElementById("item3").addEventListener("change", (e) => {
  items[2].visible = e.target.checked;
  drawScene();
});

function playSound(index) {
  const audio = new Audio(`sounds/sound${index}.wav`);
  audio.play();
}

// Initial draw after everything loads
window.onload = () => {
  drawScene();
};

function drawScene() {
  if (!bgImages[bgIndex].complete || !character.complete) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.drawImage(bgImages[bgIndex], 0, 0, canvas.width, canvas.height);

  // Draw character
  ctx.drawImage(character, characterX, 220, 64, 64);

  // Draw items
  items.forEach((item) => {
    if (item.visible) {
      ctx.drawImage(item.img, item.x, item.y, 50, 50);
    }
  });
}
