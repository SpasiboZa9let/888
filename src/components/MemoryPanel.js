// src/components/MemoryPanel.js

export default class MemoryPanel {
  /**
   * @param {string} selector — CSS-селектор контейнера панели воспоминаний
   */
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.img       = this.container.querySelector('img');
    this.textEl    = this.container.querySelector('.text');
    this.closeBtn  = this.container.querySelector('.close');

    // Закрытие панели по клику на крестик
    this.closeBtn.addEventListener('click', () => this.hide());
  }

  /**
   * Показывает панель с данными воспоминания
   * @param {{ img: string, text: string }} data
   */
  show(data) {
    this.img.src         = data.img;
    this.img.alt         = data.text;
    this.textEl.textContent = data.text;
    this.container.classList.add('visible');
  }

  /**
   * Прячет панель
   */
  hide() {
    this.container.classList.remove('visible');
  }
}

