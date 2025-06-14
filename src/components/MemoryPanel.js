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

    this.ready = true;

    // Подключаем GSAP глобально (если через CDN в HTML)
    if (!window.gsap) {
      console.error('GSAP is not loaded. Include it via CDN: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
    }
  }

  show(data) {
    if (!this.ready || !window.gsap) return;
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

    // GSAP-анимация титров: появление -> пауза -> исчезновение
    gsap.set(this.titleEl, { opacity: 0, y: 30, scale: 1 });

    gsap.to(this.titleEl, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      onComplete: () => {
        gsap.to(this.titleEl, {
          opacity: 0,
          scale: 1.05,
          delay: 2.5,
          duration: 1.1,
          ease: "power2.inOut",
          onComplete: () => {
            this.titleEl.textContent = '';
            this.ready = true;
          }
        });
      }
    });
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
    this.ready = true;
  }
}
