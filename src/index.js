// src/index.js

import { MARKERS } from './data/markers.js';
import MapRenderer from './components/MapRenderer.js';
import MemoryPanel from './components/MemoryPanel.js';
import { startSmall, stopSmall } from './animations/emojiSmall.js';
import { startLarge, stopLarge } from './animations/emojiLarge.js';

document.addEventListener('DOMContentLoaded', () => {
  // Для отладки: убедимся, что маркеры подгрузились
  console.log('MARKERS:', MARKERS);

  // Инициализируем панель воспоминаний
  const panel = new MemoryPanel('#memory-panel');

  // Рендерим маркеры на карте и привязываем к ним панель
  const renderer = new MapRenderer('#map', MARKERS, panel);
  console.log('Rendered markers:', renderer);

  // Запускаем анимации эмодзи
  startSmall();
  startLarge();

  // При необходимости остановки
  // stopSmall();
  // stopLarge();
});
