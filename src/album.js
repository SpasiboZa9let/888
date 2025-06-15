/**
 * Альбом-карусель с предзагрузкой кадров.
 *
 * ✔  🎁-плейсхолдер показывается, пока не загрузится фото
 * ✔  клик по пустому фону закрывает модалку, по кадру / стрелкам — НЕ закрывает
 * ✔  стрелки < и > листают без задержек (preload следующего кадра)
 */

import { photo } from './utils/assetPath.js';

/* ---------- данные альбома ---------- */

const albumPhotos = Array.from({ length: 10 }, (_, i) => ({
  src: photo(`${i + 1}.jpg`),
  caption:
    i === 0 ? 'Первое воспоминание'      :
    i === 1 ? 'Тёплое солнце в июле'     :
    i === 2 ? 'Шумный вечер на юге'      :
              'Тень забытого переулка'
}));

/* ---------- состояние ---------- */

let current = 0;

/* ---------- инициализация DOM ---------- */

window.addEventListener('DOMContentLoaded', () => {

  /* ищем все узлы один раз */
  const modal       = document.getElementById('album-modal');
  const frame       = modal.querySelector('.photo-frame');
  const imgEl       = document.getElementById('album-photo');
  const capEl       = document.getElementById('album-caption');
  const prevBtn     = modal.querySelector('.prev');
  const nextBtn     = modal.querySelector('.next');
  const openBtn     = document.getElementById('open-album');
  const placeholder = document.getElementById('album-placeholder');

  if (!modal || !frame || !imgEl || !capEl || !prevBtn || !nextBtn) {
    console.error('⛔ album.js: отсутствуют нужные DOM-элементы');
    return;
  }

  /* браузеру подсказки */
  imgEl.decoding = 'async';
  imgEl.loading  = 'lazy';

  /* ---------- показать кадр ---------- */

  function show(idx) {
    const { src, caption } = albumPhotos[idx];

    // включаем 🎁 и размытие
    placeholder.classList.remove('hidden');
    imgEl.classList.add('blur-up');

    // ставим новый src
    imgEl.src = src;

    // когда загрузится — снимаем эффекты
    imgEl.addEventListener('load', () => {
      imgEl.classList.remove('blur-up');
      placeholder.classList.add('hidden');
    }, { once: true });

    capEl.textContent = caption;

    // предзагружаем следующий кадр
    new Image().src = albumPhotos[(idx + 1) % albumPhotos.length].src;
  }

  /* ---------- навигация ---------- */

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();              // не даём всплыть до overlay
    current = (current + 9) % 10;
    show(current);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    current = (current + 1) % 10;
    show(current);
  });

  /* ---------- открытие / закрытие ---------- */

  openBtn?.addEventListener('click', () => {
    modal.classList.remove('hidden');
    show(current);
  });

  // закрываем, ТОЛЬКО если кликнули именно по фону-оверлею
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  // блокируем всплытие из любой точки кадра
  frame.addEventListener('click', (e) => e.stopPropagation());

  /* ---------- если модалка открыта по умолчанию ---------- */
  if (!modal.classList.contains('hidden')) show(current);
});
