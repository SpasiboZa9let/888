import { MARKERS }           from './data/markers.js';
import MapRenderer           from './components/MapRenderer.js';
import MemoryPanel           from './components/MemoryPanel.js';
import { startEmojiSmall }   from './animations/emojiSmall.js';
import { startEmojiLarge }   from './animations/emojiLarge.js';

document.addEventListener('DOMContentLoaded', () => {
  // создаём панель
  const panel = new MemoryPanel('#memory-panel');
  
  // отрисовываем маркеры и вешаем на них hover → show/hide панели
  new MapRenderer('#map', MARKERS, panel);

  // запускаем эмодзи-анимации (необязательно)
  startEmojiSmall();
  startEmojiLarge();
});
