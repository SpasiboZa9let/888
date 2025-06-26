/**
 * Альбом-карусель: листаем стрелками, выходим по ссылке «← Назад к карте».
 * Любой иной клик игнорируется.
 */

import { photo } from './utils/assetPath.js';

/* ---------- данные ---------- */

//const albumPhotos = Array.from({ length: 10 }, (_, i) => ({
  src: photo(`${i + 1}.jpg`),
 // caption:
   // i === 0 ? 'Первое воспоминание'      :
  //  i === 1 ? 'Тёплое солнце в июле'     :
  //  i === 2 ? 'Шумный вечер на юге'      :
              'Тень забытого переулка'
}));

let current = 0;                               // текущий кадр

/* ---------- когда DOM готов ---------- */

window.addEventListener('DOMContentLoaded', () => {
  const modal       = document.getElementById('album-modal');
  const frame       = modal.querySelector('.photo-frame');
  const imgEl       = document.getElementById('album-photo');
  const capEl       = document.getElementById('album-caption');
  const prevBtn     = modal.querySelector('.prev');
  const nextBtn     = modal.querySelector('.next');
  const placeholder = document.getElementById('album-placeholder');

  if (!modal || !frame || !imgEl || !capEl || !prevBtn || !nextBtn || !placeholder) {
    console.error('⛔ album.js: не найдены DOM-элементы');
    return;
  }

  /* ---------- показать кадр ---------- */

  function show(idx) {
    const { src, caption } = albumPhotos[idx];

    // 🎁-индикатор и blur
    placeholder.classList.remove('hidden');
    imgEl.classList.remove('loaded');
    imgEl.classList.add('blur-up');
    imgEl.src = src;

    imgEl.addEventListener(
      'load',
      () => {
        imgEl.classList.remove('blur-up');
        imgEl.classList.add('loaded');
        placeholder.classList.add('hidden');
      },
      { once: true }
    );

    capEl.textContent = caption;

    // предзагрузка следующего кадра
    new Image().src = albumPhotos[(idx + 1) % albumPhotos.length].src;
  }

  /* ---------- стрелки ---------- */

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();                     // блокируем всплытие
    current = (current + 9) % 10;
    show(current);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    current = (current + 1) % 10;
    show(current);
  });

  /* ---------- клики по остальной зоне ---------- */

  // Любой клик внутри .photo-frame игнорируем (чтобы не всплыл выше)
  frame.addEventListener('click', (e) => e.stopPropagation());

  // Клик по самому модальному контейнеру тоже ничего не делает
  modal.addEventListener('click', (e) => e.stopPropagation());

  /* ---------- стартовый кадр ---------- */
  show(current);
});
