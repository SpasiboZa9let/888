/* ---------- импорты ---------- */
import { MARKERS }         from './data/markers.js';
import MapRenderer         from './components/MapRenderer.js';
import MemoryPanel         from './components/MemoryPanel.js';
import { drawRoute }       from './utils/drawRoute.js';
import AudioManager        from './utils/audioManager.js';

/* ---------- звук ---------- */
const audio = new AudioManager();
document.addEventListener('click', () => audio.initOnce(),
                          { once: true, capture: true });

/* ---------- инициализация карты ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const panel = new MemoryPanel('#memory-panel');
  new MapRenderer('#map', MARKERS, panel);    // пины и hover-логика
  setTimeout(drawRoute, 100);                 // пунктир

  injectPinThumbnails();                      // мини-фото в кружок
  wireClickSound();                           // кликовый семпл
  setupProgressBar();                         // прогресс-бар
});

/* ---------- мини-фото прямо в кружок булавки ---------- */
function injectPinThumbnails() {
  const pins = document.querySelectorAll('#map .marker');
  pins.forEach((pin, idx) => {
    const m = MARKERS[idx];
    if (!m) return;

    /* MARKERS.img уже содержит "./photos/1.jpg" – ставим как есть */
    pin.style.backgroundImage = `url(${m.img})`;
  });
}

/* ---------- звук клика для булавок и стрелок ---------- */
function wireClickSound() {
  /* пины */
  document.querySelectorAll('#map .marker')
    .forEach(pin => pin.addEventListener('click', () => audio.playClick()));

  /* стрелки в альбоме */
  ['.prev', '.next'].forEach(sel => {
    document.querySelector(sel)
      ?.addEventListener('click', () => audio.playClick());
  });

  /* кнопка 🔊 / 🔇 (может отсутствовать на некоторых страницах) */
  const btn = document.getElementById('audio-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      btn.textContent = audio.toggle() ? '🔊' : '🔇';
    });
  }
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
        progressBar.style.boxShadow   = '0 0 6px rgba(75,54,33,.5)';
        progressBar.style.height      = '14px';

        albumBtn?.classList.remove('hidden');
        albumBtn?.classList.add('visible');
      }
    });
  });
}
