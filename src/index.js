import { MARKERS } from './data/markers.js';
import MapRenderer from './components/MapRenderer.js';
import MemoryPanel from './components/MemoryPanel.js';
import { startEmojiSmall } from './animations/emojiSmall.js';
import { startEmojiLarge } from './animations/emojiLarge.js';
import { drawRoute } from './utils/drawRoute.js';

document.addEventListener('DOMContentLoaded', () => {
  const panel = new MemoryPanel('#memory-panel');
  new MapRenderer('#map', MARKERS, panel);

  startEmojiSmall();
  startEmojiLarge();

  setTimeout(() => {
    drawRoute();
    setupProgressBar(); // <-- теперь вызывается после отрисовки маршрута и маркеров
  }, 150);
});

let viewedMarkers = new Set();

function setupProgressBar() {
  const markers = document.querySelectorAll('.marker');
  const progressBar = document.getElementById('progress-bar');

  if (!markers.length || !progressBar) return;

  markers.forEach((marker, index) => {
    marker.addEventListener('mouseenter', () => {
      if (!viewedMarkers.has(index)) {
        viewedMarkers.add(index);
        const percent = (viewedMarkers.size / markers.length) * 100;
        progressBar.style.width = `${percent}%`;

        if (viewedMarkers.size === markers.length) {
          progressBar.style.background = 'linear-gradient(90deg, #00ff9c, #00c9ff)';
          progressBar.style.boxShadow = '0 0 10px #00ffcc';
          progressBar.style.height = '14px';
        }
      }
    });
  });
}
