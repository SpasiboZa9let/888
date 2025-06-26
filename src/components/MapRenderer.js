// src/components/MapRenderer.js
import { qs } from '../utils/dom.js';

export default class MapRenderer {
  /**
   * @param {string} mapSelector   селектор контейнера карты, напр. '#map'
   * @param {Array<{x:number,y:number,img:string,title:string}>} markers
   * @param {MemoryPanel} panel    панель для показа воспоминания
   */
  constructor(mapSelector, markers, panel) {
    this.mapEl   = qs(mapSelector);
    this.markers = markers;
    this.panel   = panel;

    if (!this.mapEl) {
      console.error(`Map container "${mapSelector}" not found`);
      return;
    }

    // контейнер должен быть относительным, чтобы absolute-маркеры работали
    this.mapEl.style.position = 'relative';

    // пересчитываем при ресайзе
    this._onResize = this._renderMarkers.bind(this);
    window.addEventListener('resize', this._onResize);

    this._renderMarkers();
  }

  /** рисуем все маркеры */
  _renderMarkers() {
    // удаляем старые
    this.mapEl.querySelectorAll('.marker').forEach(el => el.remove());

    const { width, height } = this.mapEl.getBoundingClientRect();

    this.markers.forEach(data => {
      if (data.x < 0 || data.x > 1 || data.y < 0 || data.y > 1) {
        console.warn('Marker out of bounds', data);
        return;
      }

      const el = document.createElement('div');
      el.className = 'marker';

      // размеры иконки (можно вынести в CSS)
      const ICON_W = 48;
      const ICON_H = 48;

      // фон-иконка или миниатюра
      el.style.width  = `${ICON_W}px`;
      el.style.height = `${ICON_H}px`;
      el.style.backgroundImage    = `url(${data.img})`;
      el.style.backgroundSize     = 'cover';
      el.style.backgroundPosition = 'center';

      // якорим низ-по-центру точки
      el.style.position = 'absolute';
      el.style.left = `${data.x * width}px`;
      el.style.top  = `${data.y * height - ICON_H}px`;   // поднять на высоту иконки
      el.style.transform = 'translate(-50%, 0)';         // центрируем по X

      el.title = data.title;   // подсказка по наведению

      el.addEventListener('click', () => {
        if (this.panel?.ready) this.panel.show(data);
      });

      this.mapEl.appendChild(el);
    });

    // если нужен прогресс-бар
    if (typeof window.setupProgressBar === 'function') {
      window.setupProgressBar();
    }
  }

  destroy() {
    window.removeEventListener('resize', this._onResize);
  }
}
