/* ---------- импорты ---------- */
//import { MARKERS }   from './data/markers.js';
import MapRenderer   from './components/MapRenderer.js';
import MemoryPanel   from './components/MemoryPanel.js';
import { drawRoute } from './utils/drawRoute.js';
import AudioManager  from './utils/audioManager.js';

/* ---------- звук ---------- */
const audio = new AudioManager();
document.addEventListener('click', () => audio.initOnce(), { once: true });

/* ---------- карта + панель ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const panel = new MemoryPanel('#memory-panel');
  new MapRenderer('#map', MARKERS, panel);   // пины уже с мини-фото
  drawRoute();                               // пунктир
});

/* ---------- всё остальное после полной загрузки ---------- */
window.addEventListener('load', () => {
  wireClickSound();      // кликовый звук
  setupProgressBar();    // индикатор просмотра
});

/* ---------- звук клика ---------- */
function wireClickSound() {
  document.querySelectorAll('#map .marker')
    .forEach(pin => pin.addEventListener('click', () => audio.playClick()));

  ['.prev', '.next'].forEach(sel => {
    document.querySelector(sel)
      ?.addEventListener('click', () => audio.playClick());
  });

  const toggle = document.getElementById('audio-toggle');
  toggle?.addEventListener('click', () => {
    toggle.textContent = audio.toggle() ? '🔊' : '🔇';
  });
}

/* ---------- прогресс-бар ---------- */
function setupProgressBar() {
  const markers = document.querySelectorAll('.marker');
  const bar     = document.getElementById('progress-bar');
  const album   = document.getElementById('open-album');
  if (!markers.length || !bar) return;

  const seen = new Set();
  markers.forEach((m, i) => m.addEventListener('mouseenter', () => {
    if (seen.has(i)) return;
    seen.add(i);
    bar.style.width = `${(seen.size / markers.length) * 100}%`;
    if (seen.size === markers.length) {
      bar.style.background =
        'repeating-linear-gradient(135deg,#4b3621,#4b3621 4px,#7a5c3e 4px,#7a5c3e 8px)';
      bar.style.boxShadow = '0 0 6px rgba(75,54,33,.5)';
      bar.style.height    = '14px';
      album?.classList.remove('hidden');
      album?.classList.add('visible');
    }
  }));
}
