import { qs } from '../utils/dom.js';

export default class MapRenderer {
  constructor(mapSel, markers, panel) {
    this.mapEl = qs(mapSel);
    this.markers = markers;
    this.panel = panel;
    this._onResize = this._renderMarkers.bind(this);

    this._renderMarkers();
    window.addEventListener('resize', this._onResize);
  }

  _renderMarkers() {
    // очистить старые
    this.mapEl.querySelectorAll('.marker').forEach(m => m.remove());
    const { width, height } = this.mapEl.getBoundingClientRect();

    this.markers.forEach(m => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.left = `${m.x * width}px`;
      el.style.top  = `${m.y * height}px`;

      el.addEventListener('mouseenter', () => this.panel.show(m));
      el.addEventListener('mouseleave', () => this.panel.hide());

      this.mapEl.appendChild(el);
    });
  }
}
