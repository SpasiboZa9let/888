// src/components/MemoryPanel.js
export default class MemoryPanel {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.img       = this.container.querySelector('img');
    this.textEl    = this.container.querySelector('.text');
    this.closeBtn  = this.container.querySelector('.close');
    this.closeBtn.addEventListener('click', () => this.hide());
  }

  show({ img, text }) {
    this.img.src         = img;
    this.img.alt         = text;
    this.textEl.textContent = text;
    this.container.classList.add('visible');
  }

  hide() {
    this.container.classList.remove('visible');
  }
}
