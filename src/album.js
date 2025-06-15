import { photo } from './utils/assetPath.js';

const albumPhotos = Array.from({ length: 10 }, (_, i) => ({
  src: photo(`${i + 1}.jpg`),
  caption: i === 0
    ? 'Первое воспоминание'
    : i === 1
    ? 'Тёплое солнце в июле'
    : i === 2
    ? 'Шумный вечер на юге'
    : 'Тень забытого переулка'
}));

let current = 0;

window.addEventListener('DOMContentLoaded', () => {
  const modal   = document.getElementById('album-modal');
  const imgEl   = document.getElementById('album-photo');
  const capEl   = document.getElementById('album-caption');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const openBtn = document.getElementById('open-album');

  imgEl.decoding = 'async';
  imgEl.loading  = 'lazy';

  const show = (idx) => {
    const { src, caption } = albumPhotos[idx];
    imgEl.src = src;
    capEl.textContent = caption;
  };

  prevBtn.onclick = () => { current = (current + 9) % 10; show(current); };
  nextBtn.onclick = () => { current = (current + 1) % 10; show(current); };
  openBtn?.addEventListener('click', () => { modal.classList.remove('hidden'); show(current); });
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

  show(current);
});
