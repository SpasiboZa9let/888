/**
 * Альбом-карусель.
 * ─ Работает и в бандле Vite, и как «сырой» скрипт.
 * ─ Показывает пульсирующую 🎁-иконку-плейсхолдер, пока фото грузится.
 * ─ Блокирует всплытие кликов по стрелкам/кадру, чтобы модалка не закрывалась
 *   и не возникал «белый экран».
 */

import { photo } from './utils/assetPath.js';

/* ---------- данные ---------- */

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
  const modal   = document.getElementById('album-modal');
  const frame   = modal.querySelector('.photo-frame');
  const imgEl   = document.getElementById('album-photo');
  const capEl   = document.getElementById('album-caption');
  const prevBtn = modal.querySelector('.prev');
  const nextBtn = modal.querySelector('.next');
  const openBtn = document.getElementById('open-album');
  const placeholder = document.getElementById('album-placeholder');

  if (!modal || !imgEl || !capEl || !prevBtn || !nextBtn) {
    console.error('⛔ album.js: не найдены DOM-узлы');
    return;
  }

  imgEl.decoding = 'async';
  imgEl.loading  = 'lazy';

  /* ---------- helpers ---------- */

  const show = (idx) => {
    const { src, caption } = albumPhotos[idx];

    // показать 🎁-плейсхолдер и блюр
    placeholder.classList.remove('hidden');
    imgEl.classList.add('blur-up');

    // загрузить изображение
    imgEl.src = src;
    imgEl.addEventListener(
      'load',
      () => {
        imgEl.classList.remove('blur-up');
        placeholder.classList.add('hidden');   // спрятать 🎁
      },
      { once: true }
    );

    capEl.textContent = caption;

    // preload следующего кадра (чтобы листалось без задержки)
    new Image().src = albumPhotos[(idx + 1) % albumPhotos.length].src;
  };

  /* ---------- управление ---------- */

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    current = (current + albumPhotos.length - 1) % albumPhotos.length;
    show(current);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    current = (current + 1) % albumPhotos.length;
    show(current);
  });

  openBtn?.addEventListener('click', () => {
    modal.classList.remove('hidden');
    show(current);
  });

  // клик по фону закрывает модалку
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  // блокируем всплытие кликов по собственно кадру,
  // чтобы он не закрывал окно
  frame.addEventListener('click', (e) => e.stopPropagation());

  // показать первый кадр сразу (если модалка открыта по умолчанию)
  show(current);
});
