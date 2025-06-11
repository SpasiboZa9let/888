// src/index.js

import { MARKERS } from './data/markers.js';
import MapRenderer from './components/MapRenderer.js';
import MemoryPanel from './components/MemoryPanel.js';
import { startSmall, stopSmall } from './animations/emojiSmall.js';
import { startLarge, stopLarge } from './animations/emojiLarge.js';

document.addEventListener('DOMContentLoaded', () => {
  // Инициализируем панель воспоминаний
  const panel = new MemoryPanel('#memory-panel');

  // Рендерим маркеры на карте и привязываем к ним панель
  new MapRenderer('#map', MARKERS, panel);

  // Запускаем анимации эмодзи
  startSmall();
  startLarge();

  // При желании можно остановить анимации так:
  // stopSmall();
  // stopLarge();
});

