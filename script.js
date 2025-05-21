const exitBtn = document.getElementById("exitFullscreenBtn");

document.querySelectorAll(".fullscreenBtn").forEach((button, index) => {
  button.addEventListener("click", () => {
    const container = document.querySelectorAll(".iframe-container")[index];
    container.classList.add("fullscreen");
    exitBtn.style.display = "block";
  });
});

exitBtn.addEventListener("click", () => {
  const fullscreenContainers = document.querySelectorAll(
    ".iframe-container.fullscreen"
  );
  fullscreenContainers.forEach((container) =>
    container.classList.remove("fullscreen")
  );
  exitBtn.style.display = "none";
});
