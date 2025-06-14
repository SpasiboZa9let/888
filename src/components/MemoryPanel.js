import { qs }                  from '../utils/dom.js';
import { disablePins, enablePins } from '../index.js';   // ◀️ экспортированы в index.js

export default class MemoryPanel {
  constructor(selector) {
    this.panel = qs(selector);

    /* ── элементы ───────────────────────── */
    this.titleEl = document.createElement('div');
    this.titleEl.className = 'memory-title';

    this.img = document.createElement('img');
    this.txt = document.createElement('div');
    this.txt.className = 'text';

    this.panel.append(this.titleEl, this.img, this.txt);

    /* ── прочее ─────────────────────────── */
    this.dim      = document.getElementById('dim-overlay');
    this.isMobile = window.innerWidth < 768;
    this.queue    = Promise.resolve();
    this.ready    = true;

    if (!window.gsap) console.error('GSAP is not loaded.');
  }

  /* ============ публичный метод ============ */
  show(data) {
    if (!this.ready || !window.gsap) return;
    this.ready = false;

    disablePins();                       // 🔒 блокируем клики по пинам

    this.queue = this.queue
      .then(() => this._fadeOut())       // мягко скрываем прежнюю панель
      .then(() => this._showData(data)); // выводим новую
  }

  /* ============ внутреннее ============ */
  _showData({ img, caption = '', title = '' }) {
    this.img.src      = img;
    this.img.alt      = caption;
    this.txt.textContent   = caption;
    this.titleEl.textContent = title;

    this.panel.classList.add('visible');
    this.dim?.classList.add('visible');

    /* титры анимируются GSAP ’ом */
    gsap.set(this.titleEl, { opacity:0, y:30, scale:1 });
    gsap.to(this.titleEl, {
      opacity:1,
      y:0,
      duration:1.2,
      ease:'power3.out',
      onComplete: () => {
        gsap.to(this.titleEl, {
          opacity:0,
          scale:1.05,
          delay:2.5,
          duration:1.1,
          ease:'power2.inOut',
          onComplete: () => {
            this.titleEl.textContent = '';
            this.ready = true;

            /* автоскрытие + разблокировка */
            setTimeout(() => this.hide(), 1000);

            /* уведомляем систему (прогресс-бар и т.п.) */
            window.dispatchEvent(new CustomEvent('memoryPanelReady'));
          }
        });
      }
    });
  }

  _fadeOut() {
    return new Promise(res => {
      this.panel.classList.remove('visible');
      this.dim?.classList.remove('visible');
      setTimeout(res, 250);              // время CSS-transition
    });
  }

  /* ============ hide() — публичное ============ */
  hide() {
    this.panel.classList.remove('visible');
    this.dim?.classList.remove('visible');
    this.titleEl.textContent = '';
    this.ready = true;
    enablePins();                        // 🔓 возвращаем клики
  }
}
