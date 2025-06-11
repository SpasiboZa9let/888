// src/components/MapRenderer.js
import { qs } from '../utils/dom.js';

export default class MapRenderer {
  constructor(mapSelector, markers, panel) {
    this.mapEl   = qs(mapSelector);
    this.markers = markers;
    this.panel   = panel;
    this._bindResize();
    this._renderMarkers();
  }

  _renderMarkers() {
    // Убираем старые
    this.mapEl.querySelectorAll('.marker').forEach(el => el.remove());

    const { width, height } = this.mapEl.getBoundingClientRect();

    this.markers.forEach(data => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.left = `${data.x * width}px`;
      el.style.top  = `${data.y * height}px`;

      // Открываем панель по hover
      el.addEventListener('mouseenter', () => this.panel.show(data));
      el.addEventListener('mouseleave', () => this.panel.hide());

      this.mapEl.appendChild(el);
    });
  }

  _bindResize() {
    window.addEventListener('resize', () => this._renderMarkers());
  }
}
