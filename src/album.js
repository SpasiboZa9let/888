
const albumPhotos = [
  { src: "assets/photos/1.jpg", caption: "Первое воспоминание" },
  { src: "assets/photos/2.jpg", caption: "Тёплое солнце в июле" },
  { src: "assets/photos/3.jpg", caption: "Шумный вечер на юге" },
  { src: "assets/photos/4.jpg", caption: "Тень забытого переулка" },
];

let currentIndex = 0;

const modal = document.getElementById("album-modal");
const albumBtn = document.getElementById("open-album");
const photoEl = document.getElementById("album-photo");
const captionEl = document.getElementById("album-caption");

function showPhoto(index) {
  const photo = albumPhotos[index];
  photoEl.src = photo.src;
  captionEl.textContent = photo.caption;
}

document.querySelector(".prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + albumPhotos.length) % albumPhotos.length;
  showPhoto(currentIndex);
});

document.querySelector(".next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % albumPhotos.length;
  showPhoto(currentIndex);
});

albumBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  showPhoto(currentIndex);
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// Показываем кнопку при полном прогрессе
window.addEventListener("memoryPanelReady", () => {
  const progress = document.getElementById("progress-bar");
  if (parseFloat(progress.style.width) >= 100) {
  albumBtn.classList.add("visible");
}
});
