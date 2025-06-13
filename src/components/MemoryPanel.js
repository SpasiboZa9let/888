import { qs } from '../utils/dom.js';

export default class MemoryPanel {
  constructor(selector) {
    this.panel = qs(selector);
    this.img   = qs('img', this.panel);
    this.txt   = qs('.text', this.panel);

    this.titleEl = document.createElement('div');
    this.titleEl.className = 'memory-title';
    this.panel.appendChild(this.titleEl);

    this.isMobile = window.innerWidth < 768;
    this.queue = Promise.resolve();
  }

  show(data) {
    if (this.isMobile) {
      this.queue = this.queue
        .then(() => this._fadeOut())
        .then(() => this._showData(data));
    } else {
      this._showData(data);
    }
  }

  _showData(data) {
    this.img.src = data.img;
    this.img.alt = data.caption || '';
    this.txt.textContent = data.caption || '';
    this.titleEl.textContent = data.title || '';
    this.panel.classList.add('visible');

    // перезапуск анимации титров
    this.titleEl.classList.remove('fade');
    void this.titleEl.offsetWidth;
    this.titleEl.classList.add('fade');
  }

  _fadeOut() {
    return new Promise(resolve => {
      this.panel.classList.remove('visible');
      setTimeout(resolve, 250); // подстроено под CSS transition
    });
  }

  hide() {
    this.panel.classList.remove('visible');
    this.titleEl.textContent = '';
  }
}
