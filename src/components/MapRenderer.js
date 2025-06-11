// src/components/MapRenderer.js
import { qs } from '../utils/dom.js';

export default class MapRenderer {
  /**
   * @param {string} mapSelector — селектор контейнера карты, e.g. '#map'
   * @param {Array<{x:number,y:number,img:string,text:string}>} markers — данные точек
   * @param {MemoryPanel} panel — панель для показа воспоминания
   */
  constructor(mapSelector, markers, panel) {
    this.mapEl   = qs(mapSelector);
    this.markers = markers;
    this.panel   = panel;

    window.addEventListener('resize', () => this._renderMarkers());
    this._renderMarkers();
  }

  _renderMarkers() {
    // Удаляем старые маркеры
    this.mapEl.querySelectorAll('.marker').forEach(el => el.remove());

    const { width, height } = this.mapEl.getBoundingClientRect();

    this.markers.forEach(data => {
      const el = document.createElement('div');
      el.className = 'marker';
      // позиционируем
      el.style.left = `${data.x * width}px`;
      el.style.top  = `${data.y * height}px`;

      // показываем/скрываем панель по hover
      el.addEventListener('mouseenter', () => this.panel.show(data));
      el.addEventListener('mouseleave', () => this.panel.hide());

      this.mapEl.appendChild(el);
    });
  }
}
