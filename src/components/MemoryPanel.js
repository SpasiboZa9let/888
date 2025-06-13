import { qs } from '../utils/dom.js';

export default class MemoryPanel {
  constructor(selector) {
    this.panel = qs(selector);
    this.img   = qs('img', this.panel);
    this.txt   = qs('.text', this.panel);

    this._isMobile = window.innerWidth <= 768; // порог можно уточнить
  }

  show(data) {
    if (!this.panel) return;

    // на мобилках сначала прячем, потом показываем
    if (this._isMobile) {
      this.panel.classList.remove('visible');

      setTimeout(() => {
        this.img.src = data.img;
        this.img.alt = data.text;
        this.txt.textContent = data.text;
        this.panel.classList.add('visible');
      }, 300); // 300мс = как в transition
    } else {
      // десктоп: мгновенное обновление
      this.img.src = data.img;
      this.img.alt = data.text;
      this.txt.textContent = data.text;
      this.panel.classList.add('visible');
    }
  }

  hide() {
    if (this.panel) {
      this.panel.classList.remove('visible');
    }
  }
}
