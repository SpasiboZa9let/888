import { qs } from '../utils/dom.js';

export default class MapRenderer {
  /**
   * @param {string}   mapSelector селектор контейнера карты – «#map»
   * @param {Array<{x:number,y:number,img:string,title:string}>} markers
   * @param {MemoryPanel} panel   панель воспоминания
   */
  constructor(mapSelector, markers, panel) {
    this.mapEl   = qs(mapSelector);
    this.markers = markers;
    this.panel   = panel;

    if (!this.mapEl) {
      console.error(`Map container "${mapSelector}" not found`);
      return;
    }

    this._onResize = () => this._renderMarkers();
    window.addEventListener('resize', this._onResize);

    this._renderMarkers();
  }

  _renderMarkers() {
    /* чистим прежние пины */
    this.mapEl.querySelectorAll('.marker').forEach(el => el.remove());

    const { width, height } = this.mapEl.getBoundingClientRect();

    this.markers.forEach(data => {
      if (data.x < 0 || data.x > 1 || data.y < 0 || data.y > 1) {
        console.warn('Marker out of bounds', data);
        return;
      }

      /* создаём булавку */
      const pin = document.createElement('button');
      pin.className = 'marker';
      pin.style.position = 'absolute';
      pin.style.left  = `${data.x * width}px`;
      pin.style.top   = `${data.y * height}px`;
      /* мини-превью сразу как фон */
      pin.style.backgroundImage    = `url(${data.img})`;
      pin.style.backgroundSize     = 'cover';
      pin.style.backgroundPosition = 'center';

      pin.addEventListener('click', () => {
        if (this.panel.ready) this.panel.show(data);
      });

      this.mapEl.appendChild(pin);
    });

    /* прогресс-бар обновится после каждого рендера */
    window.setupProgressBar?.();
  }

  destroy() {
    window.removeEventListener('resize', this._onResize);
  }
}
