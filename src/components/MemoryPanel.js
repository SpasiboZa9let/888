import { qs } from '../utils/dom.js';

export default class MemoryPanel {
  constructor(selector) {
    this.panel = qs(selector);
    this.img   = qs('img', this.panel);
    this.txt   = qs('.text', this.panel);

    // создаём элемент для титров
    this.titleEl = document.createElement('div');
    this.titleEl.className = 'memory-title';
    this.panel.appendChild(this.titleEl);
  }

  show(data) {
    this.img.src = data.img;
    this.img.alt = data.caption || '';
    this.txt.textContent = data.caption || '';
    this.titleEl.textContent = data.title || '';
    this.panel.classList.add('visible');

    // запуск анимации
    this.titleEl.classList.remove('fade');
    void this.titleEl.offsetWidth; // триггер перерисовки
    this.titleEl.classList.add('fade');
  }

  hide() {
    this.panel.classList.remove('visible');
    this.titleEl.textContent = '';
  }
}
