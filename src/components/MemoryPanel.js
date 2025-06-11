import { qs } from '../utils/dom.js';

export default class MemoryPanel {
  constructor(selector) {
    this.panelEl = qs(selector);
    this.imgEl   = qs('img', this.panelEl);
    this.textEl  = qs('.text', this.panelEl);
    this.closeBtn = qs('.close', this.panelEl);
    this.closeBtn.addEventListener('click', () => this.hide());
  }

  show({ img, text }) {
    this.imgEl.src = img;
    this.imgEl.alt = text;
    this.textEl.textContent = text;
    this.panelEl.classList.add('visible');
  }

  hide() {
    this.panelEl.classList.remove('visible');
  }
}
