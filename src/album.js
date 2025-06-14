const albumPhotos = [
  { src: "/888/assets/photos/1.jpg", caption: "Первое воспоминание" },
  { src: "/888/assets/photos/2.jpg", caption: "Тёплое солнце в июле" },
  { src: "/888/assets/photos/3.jpg", caption: "Шумный вечер на юге" },
  { src: "/888/assets/photos/4.jpg", caption: "Тень забытого переулка" },
  { src: "/888/assets/photos/5.jpg", caption: "Тень забытого переулка" },
  { src: "/888/assets/photos/6.jpg", caption: "Тень забытого переулка" },
  { src: "/888/assets/photos/7.jpg", caption: "Тень забытого переулка" },
  { src: "/888/assets/photos/8.jpg", caption: "Тень забытого переулка" },
  { src: "/888/assets/photos/9.jpg", caption: "Тень забытого переулка" },
  { src: "/888/assets/photos/10.jpg", caption: "Тень забытого переулка" }
];

let currentIndex = 0;

window.addEventListener("load", () => {
  const modal = document.getElementById("album-modal");
  const photoEl = document.getElementById("album-photo");
  const captionEl = document.getElementById("album-caption");
  const albumBtn = document.getElementById("open-album");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (!modal || !photoEl || !captionEl || !prevBtn || !nextBtn) {
    console.error("⛔ Не найдены DOM-элементы альбома.");
    return;
  }

  function showPhoto(index) {
    const photo = albumPhotos[index];
    photoEl.src = photo.src;
    captionEl.textContent = photo.caption;
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + albumPhotos.length) % albumPhotos.length;
    showPhoto(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % albumPhotos.length;
    showPhoto(currentIndex);
  });

  if (albumBtn) {
    albumBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      showPhoto(currentIndex);
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // Показываем первый кадр сразу
  showPhoto(currentIndex);
});
