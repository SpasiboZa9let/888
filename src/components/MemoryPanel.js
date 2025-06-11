// src/components/MemoryPanel.js
import { qs } from '../utils/dom.js';

export default class MemoryPanel {
  constructor(selector) {
    this.panelEl  = qs(selector);
    this.imgEl    = qs('img', this.panelEl);
    this.textEl   = qs('.text', this.panelEl);
    this.overlay  = qs('#overlay');

    // у нас больше не нужен крестик-клик, но можно всё оставить
    const closeBtn = qs('.close', this.panelEl);
    closeBtn?.addEventListener('click', () => this.hide());
    this.overlay?.addEventListener('click', () => this.hide());
  }

  show({ img, text }) {
    this.imgEl.src   = img.startsWith('./') ? img : `./${img}`;
    this.imgEl.alt   = text;
    this.textEl.textContent = text;

    this.overlay?.classList.add('visible');
    this.panelEl.classList.add('visible');
  }

  hide() {
    this.overlay?.classList.remove('visible');
    this.panelEl.classList.remove('visible');
  }
}
