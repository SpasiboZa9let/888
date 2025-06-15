import { photo } from './utils/assetPath.js';

const albumPhotos = Array.from({ length: 10 }, (_, i) => ({
  src: photo(`${i + 1}.jpg`),
  caption:
    i === 0 ? 'Первое воспоминание'      :
    i === 1 ? 'Тёплое солнце в июле'     :
    i === 2 ? 'Шумный вечер на юге'      :
              'Тень забытого переулка'
}));

let current = 0;

window.addEventListener('DOMContentLoaded', () => {
  const modal   = document.getElementById('album-modal');
  const frame   = modal.querySelector('.photo-frame');
  const imgEl   = document.getElementById('album-photo');
  const capEl   = document.getElementById('album-caption');
  const prevBtn = modal.querySelector('.prev');
  const nextBtn = modal.querySelector('.next');
  const openBtn = document.getElementById('open-album');

  if (!modal || !frame || !imgEl || !capEl || !prevBtn || !nextBtn) {
    console.error('⛔ album.js: нет нужных DOM-элементов');
    return;
  }

  function show(idx) {
    const { src, caption } = albumPhotos[idx];
    imgEl.src = src;
    capEl.textContent = caption;
    // предзагрузка следующего кадра
    new Image().src = albumPhotos[(idx + 1) % albumPhotos.length].src;
  }

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    current = (current + 9) % 10;
    show(current);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    current = (current + 1) % 10;
    show(current);
  });

  openBtn?.addEventListener('click', () => {
    modal.classList.remove('hidden');
    show(current);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  frame.addEventListener('click', (e) => e.stopPropagation());
});
