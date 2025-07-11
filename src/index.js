/* ---------- импорты ---------- */
import { MARKERS }           from './data/markers.js';
import MapRenderer           from './components/MapRenderer.js';
import MemoryPanel           from './components/MemoryPanel.js';
import { drawRoute }         from './utils/drawRoute.js';
import AudioManager from './utils/audioManager.js';
const audio = new AudioManager();

document.addEventListener('click', () => audio.initOnce(), { once: true });

const btn = document.getElementById('audio-toggle');
btn.addEventListener('click', () => {
  const on = audio.toggle();
  btn.textContent = on ? '🔊' : '🔇';
});

/* ---------- инициализация карты ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const panel = new MemoryPanel('#memory-panel');
  new MapRenderer('#map', MARKERS, panel);        // пины + hover-логика
  setTimeout(drawRoute, 100);                     // дорисовать маршрут

  injectPinThumbnails();                          // мини-фото в кружок
  setupProgressBar();                             // глобал уже не нужен
});

/* ---------- мини-фото прямо в кружок булавки ---------- */
function injectPinThumbnails() {
  const pins = document.querySelectorAll('#map .marker');

  pins.forEach((pin, idx) => {
    const m = MARKERS[idx];
    if (!m) return;

    /* убираем ./ или / в начале, чтобы не запутать проверку */
    const clean = m.img.replace(/^\.?\//, '');          // «./photos/1.jpg» -> «photos/1.jpg»

    const imgPath = clean.startsWith('photos/')
      ? clean                                         // уже с префиксом, ничего не добавляем
      : `photos/${clean}`;                            // иначе дописываем

    pin.style.backgroundImage = `url(${imgPath})`;
  });
}




/* ---------- прогресс-бар ---------- */
function setupProgressBar() {
  const markers     = document.querySelectorAll('.marker');
  const progressBar = document.getElementById('progress-bar');
  const albumBtn    = document.getElementById('open-album');
  if (!markers.length || !progressBar) return;

  const viewed = new Set();

  markers.forEach((marker, idx) => {
    marker.addEventListener('mouseenter', () => {
      if (viewed.has(idx)) return;

      viewed.add(idx);
      progressBar.style.width =
        `${(viewed.size / markers.length) * 100}%`;

      if (viewed.size === markers.length) {
        progressBar.style.background =
          'repeating-linear-gradient(135deg,#4b3621,#4b3621 4px,#7a5c3e 4px,#7a5c3e 8px)';
        progressBar.style.boxShadow = '0 0 6px rgba(75,54,33,.5)';
        progressBar.style.height = '14px';

        albumBtn?.classList.remove('hidden');
        albumBtn?.classList.add('visible');
      }
    });
  });
}
