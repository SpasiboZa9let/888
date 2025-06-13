import { MARKERS } from './data/markers.js';
import MapRenderer from './components/MapRenderer.js';
import MemoryPanel from './components/MemoryPanel.js';
import { startEmojiSmall } from './animations/emojiSmall.js';
import { startEmojiLarge } from './animations/emojiLarge.js';
import { drawRoute } from './drawRoute.js';

document.addEventListener('DOMContentLoaded', () => {
  const panel = new MemoryPanel('#memory-panel');
  new MapRenderer('#map', MARKERS, panel);

  // без этого смайлы не появятся
  startEmojiSmall();
  startEmojiLarge();

  // небольшой отложенный запуск маршрута, чтобы дождаться .marker
  setTimeout(drawRoute, 100);
});
