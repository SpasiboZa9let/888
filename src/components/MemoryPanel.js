import { qs } from '../utils/dom.js';

export default class MemoryPanel {
  constructor(selector) {
    this.panel = qs(selector);

    // Создаём элементы
    this.titleEl = document.createElement('div');
    this.titleEl.className = 'memory-title';

    this.img = document.createElement('img');
    this.txt = document.createElement('div');
    this.txt.className = 'text';

    this.panel.appendChild(this.titleEl);
    this.panel.appendChild(this.img);
    this.panel.appendChild(this.txt);

    this.dim = document.getElementById('dim-overlay');
    this.isMobile = window.innerWidth < 768;
    this.queue = Promise.resolve();

    this.ready = true; // <- можно ли кликать маркеры

    this.titleEl.addEventListener('animationend', () => {
      if (this.titleEl.classList.contains('fade')) {
        this.titleEl.classList.remove('fade');
        this.titleEl.textContent = '';
        this.ready = true; // <- теперь разрешаем клик
      }
    });
  }

  show(data) {
    if (!this.ready) return; // пока титры играют — блокируем

    this.ready = false;

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
    if (this.dim) this.dim.classList.add('visible');

    this.titleEl.classList.remove('fade');
    void this.titleEl.offsetWidth;
    this.titleEl.classList.add('fade');
  }

  _fadeOut() {
    return new Promise(resolve => {
      this.panel.classList.remove('visible');
      if (this.dim) this.dim.classList.remove('visible');
      setTimeout(resolve, 250);
    });
  }

  hide() {
    this.panel.classList.remove('visible');
    if (this.dim) this.dim.classList.remove('visible');

    this.titleEl.textContent = '';
    this.titleEl.classList.remove('fade');
    this.ready = true; // вдруг используешь hide вручную
  }
}
