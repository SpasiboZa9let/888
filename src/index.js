import { MARKERS } from './data/markers.js';
import MapRenderer  from './components/MapRenderer.js';
import MemoryPanel  from './components/MemoryPanel.js';

document.addEventListener('DOMContentLoaded', () => {
  // создаём панель и сразу передаём её в рендерер карты
  const panel = new MemoryPanel('#memory-panel');
  new MapRenderer('#map', MARKERS, panel);
});
