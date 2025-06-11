import { MARKERS } from './data/markers.js';
import MapRenderer from './components/MapRenderer.js';
import MemoryPanel from './components/MemoryPanel.js';

document.addEventListener('DOMContentLoaded', () => {
  const mapEl = document.getElementById('map');
  const panel = new MemoryPanel('#memory-panel');
  new MapRenderer(mapEl, MARKERS, panel).render();
});
