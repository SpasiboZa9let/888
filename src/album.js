/**
 * Фото-альбом с ленивой подгрузкой.
 *
 * ─ Пульсирующий 🎁-placeholder виден, пока кадр не загрузится.
 * ─ Клик по оверлею (тёмному фону) закрывает; клик по кадру/стрелкам не закрывает.
 * ─ После закрытия модалки всё состояние сбрасывается → «белый экран» не появляется.
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

let current = 0;                               // индекс показываемого кадра

/* ---------- инициализация ---------- */

window.addEventListener('DOMContentLoaded', () => {
  const modal       = document.getElementById('album-modal');
  const frame       = modal.querySelector('.photo-frame');
  const imgEl       = document.getElementById('album-photo');
  const capEl       = document.getElementById('album-caption');
  const prevBtn     = modal.querySelector('.prev');
  const nextBtn     = modal.querySelector('.next');
  const openBtn     = document.getElementById('open-album');   // кнопка на карте
  const placeholder = document.getElementById('album-placeholder');

  /* защита от отсутствующих узлов */
  if (!modal || !frame || !imgEl || !capEl || !prevBtn || !nextBtn || !placeholder) {
    console.error('⛔ album.js: не найдены DOM-элементы');
    return;
  }

  imgEl.decoding = 'async';
  imgEl.loading  = 'lazy';

  /* ---------- показать кадр ---------- */

  function show(idx) {
    const { src, caption } = albumPhotos[idx];

    // сбрасываем возможное старое состояние
    imgEl.classList.add('blur-up');
    placeholder.classList.remove('hidden');

    // ставим новое изображение
    imgEl.src = src;
    imgEl.addEventListener('load', handleLoad, { once: true });

    capEl.textContent = caption;

    // preload следующего кадра
    new Image().src = albumPhotos[(idx + 1) % albumPhotos.length].src;
  }

  function handleLoad() {
    imgEl.classList.remove('blur-up');
    placeholder.classList.add('hidden');
  }

  /* ---------- навигация стрелками ---------- */

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();        // не даём всплыть до оверлея
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
    resetState();               // на всякий случай
    modal.classList.remove('hidden');
    show(current);
  });

  // клик именно по фону-оверлею → закрываем
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // блокируем всплытие всех кликов из кадра
  frame.addEventListener('click', (e) => e.stopPropagation());

  function closeModal() {
    modal.classList.add('hidden');
    resetState();               // сбрасываем, чтобы при следующем открытии 🎁 снова был
  }

  function resetState() {
    placeholder.classList.remove('hidden');
    imgEl.classList.remove('blur-up');
    imgEl.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="7"></svg>';
  }
});
