// src/components/MapRenderer.js
import { qs } from '../utils/dom.js';

export default class MapRenderer {
  /**
   * @param {string} mapSelector — CSS-селектор контейнера карты, например '#map'
   * @param {Array<{x: number, y: number, img: string, text: string}>} markers — данные для маркеров
   * @param {MemoryPanel} panel — инстанс боковой панели
   */
  constructor(mapSelector, markers, panel) {
    this.mapEl   = qs(mapSelector);
    this.markers = markers;
    this.panel   = panel;

    this._onResize = this._renderMarkers.bind(this);
    window.addEventListener('resize', this._onResize);

    this._renderMarkers();
  }

  _renderMarkers() {
    // Удаляем предыдущие маркеры
    this.mapEl.querySelectorAll('.marker').forEach(el => el.remove());

    const { width, height } = this.mapEl.getBoundingClientRect();

    this.markers.forEach(data => {
      const el = document.createElement('div');
      el.className = 'marker';

      // рассчитываем позицию в пикселях
      el.style.left = `${data.x * width}px`;
      el.style.top  = `${data.y * height}px`;

      // показываем панель по наведению
      el.addEventListener('mouseenter', () => this.panel.show(data));
      el.addEventListener('mouseleave', () => this.panel.hide());

      this.mapEl.appendChild(el);
    });
  }

  // Если понадобится остановить отслеживание ресайза
  destroy() {
    window.removeEventListener('resize', this._onResize);
  }
}
