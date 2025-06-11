import { qs } from '../utils/dom.js';

export default class MemoryPanel {
  constructor(selector) {
    this.panelEl  = qs(selector);
    this.imgEl    = qs('img', this.panelEl);
    this.textEl   = qs('.text', this.panelEl);
    this.closeBtn = qs('.close', this.panelEl);
    this.overlay  = document.getElementById('overlay');

    this.closeBtn.addEventListener('click', () => this.hide());
    this.overlay.addEventListener('click', () => this.hide());
  }

  show({ img, text }) {
    // гарантируем корректный путь
    this.imgEl.src = img.startsWith('./') ? img : `./${img}`;
    this.imgEl.alt = text;
    this.textEl.textContent = text;

    this.overlay.classList.add('visible');
    this.panelEl.classList.add('visible');
  }

  hide() {
    this.overlay.classList.remove('visible');
    this.panelEl.classList.remove('visible');
  }
}
