// src/components/MapRenderer.js
import { qs } from '../utils/dom.js';

/**
 * Отвечает за размещение маркеров поверх фоновой карты.
 * Работает с нормализованными координатами (x, y ∈ [0 .. 1]).
 */
export default class MapRenderer {
  /**
   * @param {string} mapSelector  селектор контейнера карты (например, '#map')
   * @param {Array<{x:number,y:number,img:string,title:string}>} markers
   * @param {MemoryPanel} panel   объект панели воспоминаний (может быть null)
   */
  constructor(mapSelector, markers, panel) {
    this.mapEl   = qs(mapSelector);
    this.markers = markers;
    this.panel   = panel;

    if (!this.mapEl) {
      console.error(`Map container "${mapSelector}" not found`);
      return;
    }

    /* контейнер нужен относительным, чтобы absolute-метки «привязывались» к нему */
    this.mapEl.style.position = 'relative';

    /* пересчитываем позиции при любом ресайзе окна */
    this._onResize = this._renderMarkers.bind(this);
    window.addEventListener('resize', this._onResize);

    this._renderMarkers();
  }

  /** Создаёт и позиционирует DOM-элементы меток */
  _renderMarkers() {
    /* удаляем старые */
    this.mapEl.querySelectorAll('.marker').forEach(n => n.remove());

    /* размеры контейнера */
    const { width, height } = this.mapEl.getBoundingClientRect();

    /* для каждой точки создаём div-иконку */
    this.markers.forEach(m => {
      if (m.x < 0 || m.x > 1 || m.y < 0 || m.y > 1) return; // фильтр на всякий

      const el = document.createElement('div');
      el.className = 'marker';

      /* позиция (center-bottom) */
      el.style.left = `${m.x * width}px`;
      el.style.top  = `${m.y * height}px`;

      /* фон-миниатюра */
      el.style.backgroundImage = `url(${m.img})`;
      el.title = m.title;

      /* клик по метке открывает панель (если её передали) */
      el.onclick = () => this.panel?.ready && this.panel.show(m);

      this.mapEl.appendChild(el);
    });
  }

  /** Снять обработчики, когда карта больше не нужна */
  destroy() {
    window.removeEventListener('resize', this._onResize);
  }
}
