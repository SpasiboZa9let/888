// src/components/MapRenderer.js
import { createEl, onResize } from '../utils/dom.js';

export default class MapRenderer {
  constructor(mapSelector, markers, panel) {
    this.map = document.querySelector(mapSelector);
    this.markers = markers;
    this.panel = panel;
    this._markerEls = [];
    this._init();
  }

  _init() {
    this.markers.forEach(data => {
      const el = createEl('div', { className: 'marker' });
      this.map.appendChild(el);
      el.addEventListener('click', () => this.panel.show(data));
      this._markerEls.push({ el, data });
    });
    this._updatePositions();
    onResize(() => this._updatePositions());
  }

  _updatePositions() {
    const { width, height } = this.map.getBoundingClientRect();
    this._markerEls.forEach(({ el, data }) => {
      el.style.left = `${data.x * width}px`;
      el.style.top  = `${data.y * height}px`;
    });
  }
}
