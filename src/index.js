import { MARKERS } from './data/markers.js';
import MapRenderer    from './components/MapRenderer.js';
import MemoryPanel    from './components/MemoryPanel.js';
import { drawRoute }  from './utils/drawRoute.js';

/**
 * Основная инициализация карты.
 * Вызывается из start.js, когда пользователь нажимает «Начать путь».
 */
export function initMap () {
  const panel = new MemoryPanel('#memory-panel');
  new MapRenderer('#map', MARKERS, panel);
  setTimeout(drawRoute, 100);   // как было раньше

  setupProgressBar();           // ← запускаем отслеживание маркеров
}

/* ---------- прогресс-бар и сохранение прогресса ---------- */
function setupProgressBar () {
  const markers     = document.querySelectorAll('.marker');
  const progressBar = document.getElementById('progress-bar');

  if (!markers.length || !progressBar) return;

  const viewed = new Set();

  markers.forEach((marker, idx) => {
    marker.addEventListener('mouseenter', () => {
      if (viewed.has(idx)) return;

      viewed.add(idx);

      /* процент заполнения */
      const percent = (viewed.size / markers.length) * 100;
      progressBar.style.width = `${percent}%`;
      // сохраняем в localStorage, чтобы старт-экран знал текущий %
      localStorage.setItem('progressPercent', percent.toFixed(1));

      /* всё пройдено — финальный стиль + расчехляем альбом */
      if (viewed.size === markers.length) {
        progressBar.style.background =
          'repeating-linear-gradient(135deg,#4b3621,#4b3621 4px,#7a5c3e 4px,#7a5c3e 8px)';
        progressBar.style.boxShadow = '0 0 6px rgba(75,54,33,.5)';
        progressBar.style.height    = '14px';
      }
    });
  });
}
