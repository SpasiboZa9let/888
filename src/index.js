import { MARKERS } from './data/markers.js';
import MapRenderer from './components/MapRenderer.js';
import MemoryPanel from './components/MemoryPanel.js';

document.addEventListener('DOMContentLoaded', () => {
  const panel = new MemoryPanel('#memory-panel');
  new MapRenderer('#map', MARKERS, panel);
});
