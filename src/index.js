import { MARKERS } from './data/markers.js';
import MapRenderer from './components/MapRenderer.js';
import MemoryPanel from './components/MemoryPanel.js';
import { startEmojiSmall } from './animations/emojiSmall.js';
import { startEmojiLarge } from './animations/emojiLarge.js';
import { drawRoute } from './utils/drawRoute.js';

document.addEventListener('DOMContentLoaded', () => {
  const panel = new MemoryPanel('#memory-panel');
  new MapRenderer('#map', MARKERS, panel);

  // запуск анимаций эмодзи
  startEmojiSmall();
  startEmojiLarge();

  // подождать, пока маркеры появятся
  setTimeout(drawRoute, 100);
});
