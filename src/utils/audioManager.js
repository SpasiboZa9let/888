/* src/utils/audioManager.js
   Управляет фоновым лупом и кликом-семплом */
const base = (import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : './';

export default class AudioManager {
  constructor() {
    this.bg    = new Audio(`${base}audio/bg.mp3`);
    this.click = new Audio(`${base}audio/click.mp3`);
    /* остальной код без изменений */
  }
}

    this.bg.loop   = true;
    this.bg.volume = 0.4;
    this.click.volume = 0.8;

    this.enabled = false;
  }

  initOnce() {
    if (this.enabled) return;
    this.enabled = true;
    this.bg.play().catch(() => {});
  }

  toggle() {
    this.enabled = !this.enabled;
    this.enabled ? this.bg.play() : this.bg.pause();
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.click.currentTime = 0;
    this.click.play().catch(() => {});
  }
}
