import { qs } from '../utils/dom.js';
const gsap = window.gsap;

export default class MemoryPanel {
  constructor(selector) {
    this.panel = qs(selector);

    // Элементы
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

    this.ready = true;
  }

  show(data) {
    if (!window.gsap) return;
    if (this.isMobile) {
      this.queue = this.queue
        .then(() => this._fadeOut())
        .then(() => this._showData(data));
    } else {
      this._showData(data);
    }
  }

  _showData(data) {
    if (!this.ready) return;
    this.ready = false;

    this.img.src = data.img;
    this.img.alt = data.caption || '';
    this.txt.textContent = data.caption || '';
    this.titleEl.textContent = data.title || '';

    this.panel.classList.add('visible');
    if (this.dim) this.dim.classList.add('visible');

    // Анимация титров через GSAP
    gsap.fromTo(this.titleEl,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(this.titleEl, {
            opacity: 0,
            delay: 1.2,
            duration: 0.8,
            onComplete: () => {
  this.titleEl.textContent = '';

  // КОСТЫЛЬ: убираем панель через 2 секунды после титров
  setTimeout(() => {
    this.panel.classList.remove('visible');
    if (this.dim) this.dim.classList.remove('visible');
    this.ready = true;

    const event = new CustomEvent('memoryPanelReady');
    window.dispatchEvent(event);
  }, 2000);
}

          });
        }
      }
    );
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
  }
}
