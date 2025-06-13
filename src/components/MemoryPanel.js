import { qs } from '../utils/dom.js';

export default class MemoryPanel {
  constructor(selector) {
    this.panel = qs(selector);
    this.img   = qs('img', this.panel);
    this.txt   = qs('.text', this.panel);
  }

  show(data) {
    this.img.src = data.img;
    this.img.alt = data.text;
    this.txt.textContent = data.text;

    // Удаляем старый fade, если есть
    const old = this.panel.querySelector('.title-fade');
    if (old) old.remove();

    const title = document.createElement('div');
    title.className = 'title-fade';
    title.textContent = data.text;
    this.panel.appendChild(title);

    this.panel.classList.add('visible');
  }

  hide() {
    this.panel.classList.remove('visible');
    const title = this.panel.querySelector('.title-fade');
    if (title) title.remove();
  }
}
