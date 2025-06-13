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

    this._onResize = this._renderMarkers.bind(this);
    window.addEventListener('resize', this._onResize);

    // Закрытие панели по клику вне карты и вне самой панели
    document.addEventListener('click', (e) => {
      if (
        !this.mapEl.contains(e.target) &&
        !this.panel.panelEl.contains(e.target)
      ) {
        this.panel.hideMemory();
      }
    });

    this._renderMarkers();
  }

  _renderMarkers() {
    // Удаляем старые маркеры
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
      el.style.position = 'absolute';

      // 👆 Обработка клика по сердечку-маркеру
      el.addEventListener('click', (e) => {
        e.stopPropagation(); // не закрываем панель сразу
        this.panel.showMemory(data);
      });

      this.mapEl.appendChild(el);
    });

    if (typeof window.setupProgressBar === 'function') {
      window.setupProgressBar();
    }
  }

  destroy() {
    window.removeEventListener('resize', this._onResize);
  }
}
