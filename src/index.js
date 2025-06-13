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

  setTimeout(drawRoute, 100);
  setupProgressBar();
});

window.setupProgressBar = function () {
  const markers = document.querySelectorAll('.marker');
  const leftBar = document.getElementById('progress-bar-left');
  const rightBar = document.getElementById('progress-bar-right');

  if (!markers.length || !leftBar || !rightBar) return;

  const viewedMarkers = new Set();

  markers.forEach((marker, index) => {
    marker.addEventListener('mouseenter', () => {
      if (!viewedMarkers.has(index)) {
        viewedMarkers.add(index);

        const percent = (viewedMarkers.size / markers.length) * 100;
        const half = Math.min(percent / 2, 50);

        leftBar.style.width = `${half}%`;
        rightBar.style.width = `${half}%`;
      }
    });
  });
};
