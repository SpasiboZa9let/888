/* ---------- импорты ---------- */
import { MARKERS }      from './data/markers.js';
import MapRenderer      from './components/MapRenderer.js';
import MemoryPanel      from './components/MemoryPanel.js';
import { drawRoute }    from './utils/drawRoute.js';

/* ------------- ГЛАВНАЯ ТОЧКА ЗАПУСКА ------------- */
export function initMap () {
  /* 1. Панель и рендер маркеров */
  const panel = new MemoryPanel('#memory-panel');
  new MapRenderer('#map', MARKERS, panel);

  /* 2. Рисуем маршрут, если он нужен */
  setTimeout(drawRoute, 100);

  /* 3. Запускаем прогресс-бар */
  setupProgressBar();
 window.dispatchEvent(new Event('mapReady'));
}

/* ---------- ПРОГРЕСС-БАР + сохранение ---------- */
function setupProgressBar () {
  const markers     = document.querySelectorAll('.marker');
  const progressBar = document.getElementById('progress-bar');

  if (!markers.length || !progressBar) return;

  const viewed = new Set();

  markers.forEach((marker, idx) => {
    marker.addEventListener('mouseenter', () => {
      if (viewed.has(idx)) return;

      viewed.add(idx);

      /* вычисляем процент, ширину и записываем */
      const percent = (viewed.size / markers.length) * 100;
      progressBar.style.width = `${percent}%`;
      localStorage.setItem('progressPercent', percent.toFixed(1));   // <-- сохраняем

      /* достижение 100 % — финальный стиль и снятие блокировки альбома */
      if (percent >= 100) {
        progressBar.style.background =
          'repeating-linear-gradient(135deg,#4b3621,#4b3621 4px,#7a5c3e 4px,#7a5c3e 8px)';
        progressBar.style.boxShadow = '0 0 6px rgba(75,54,33,.5)';
        progressBar.style.height    = '14px';
        localStorage.setItem('fullCompleted', 'yes');   // сохранить факт
        window.dispatchEvent(new Event('progress100')); // оповестить start.js
}

        /* подсветим кнопку альбома, если она уже есть на странице */
        const albumBtn = document.getElementById('album-button');
        if (albumBtn) albumBtn.classList.remove('hidden');
      }
    });
  });
}

/* ---------- Утилиты блокировки пинов (исп. из MemoryPanel) ---------- */
export function disablePins () {
  document.querySelectorAll('.marker').forEach(m => m.classList.add('disabled'));
}
export function enablePins () {
  document.querySelectorAll('.marker').forEach(m => m.classList.remove('disabled'));
}
