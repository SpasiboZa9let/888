import { MARKERS } from './data/markers.js';
import MapRenderer from './components/MapRenderer.js';
import MemoryPanel from './components/MemoryPanel.js';
import { startEmojiSmall } from './animations/emojiSmall.js';
import { startEmojiLarge } from './animations/emojiLarge.js';
import { drawRoute } from './utils/drawRoute.js';


document.addEventListener('DOMContentLoaded', () => {
  const panel = new MemoryPanel('#memory-panel');
  new MapRenderer('#map', MARKERS, panel);

  // startEmojiSmall();
  // startEmojiLarge();

  setTimeout(drawRoute, 100);
});

// Глобально доступная функция — будет вызвана внутри MapRenderer
window.setupProgressBar = function () {
  const markers = document.querySelectorAll('.marker');
  const progressBar = document.getElementById('progress-bar');

  if (!markers.length || !progressBar) return;

  const viewedMarkers = new Set();

  markers.forEach((marker, index) => {
    marker.addEventListener('mouseenter', () => {
      if (!viewedMarkers.has(index)) {
        viewedMarkers.add(index);
        const percent = (viewedMarkers.size / markers.length) * 100;
        progressBar.style.width = `${percent}%`;

        if (viewedMarkers.size === markers.length) {
          // Полный прогресс
          progressBar.style.background = 'repeating-linear-gradient(135deg, #4b3621, #4b3621 4px, #7a5c3e 4px, #7a5c3e 8px)';
          progressBar.style.boxShadow = '0 0 6px rgba(75, 54, 33, 0.5)';
          progressBar.style.height = '14px';

          // Показываем кнопку альбома
          const albumBtn = document.getElementById('open-album');
          if (albumBtn) {
  albumBtn.classList.remove('hidden');
  albumBtn.classList.add('visible');
}

      }
    });
  });
};
