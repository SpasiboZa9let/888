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

    if (!this.mapEl) {
      console.error(`Map container "${mapSelector}" not found`);
      return;
    }

    // Всегда привязываемся к ресайзу, чтобы маркеры правильно позиционировались
    this._onResize = this._renderMarkers.bind(this);
    window.addEventListener('resize', this._onResize);

    // Первая отрисовка
    this._renderMarkers();
  }

  _renderMarkers() {
    // Удаляем старые
    this.mapEl.querySelectorAll('.marker').forEach(el => el.remove());

    const { width, height } = this.mapEl.getBoundingClientRect();

    this.markers.forEach(data => {
      if (data.x < 0 || data.x > 1 || data.y < 0 || data.y > 1) {
        console.warn("Marker out of bounds", data);
        return;
      }

      const el = document.createElement('div');
      el.className = 'marker';
      el.style.left = `${data.x * width}px`;
      el.style.top  = `${data.y * height}px`;

      // Стили для маркера
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.backgroundImage = 'url(/assets/pin.png)';
      el.style.backgroundSize = 'contain';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.position = 'absolute';
      el.style.zIndex = '10';
      el.style.cursor = 'pointer';

      // Появление/скрытие панели по наведению
      el.addEventListener('mouseenter', () => this.panel.show(data));
      el.addEventListener('mouseleave', () => this.panel.hide());

      this.mapEl.appendChild(el);
    });
  }

  // Если нужно, можно отключить ресайз-слушатель
  destroy() {
    window.removeEventListener('resize', this._onResize);
  }
}
