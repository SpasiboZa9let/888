export default class AudioManager {
  constructor() {
    /* фоновый луп */
    this.bg = new Audio('./audio/bg.mp3');
    this.bg.loop   = true;
    this.bg.volume = 0.4;

    /* семпл на клик */
    this.click = new Audio('./audio/click.mp3');
    this.click.volume = 0.8;

    this.enabled = false;      // звук пока выключен
  }

  /* первый пользовательский клик → включаем звук */
  initOnce() {
    if (this.enabled) return;
    this.enabled = true;
    this.bg.play().catch(() => {/* браузер может задержать — ок */});
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled)  this.bg.play();
    else               this.bg.pause();
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.click.currentTime = 0;   // чтобы щелчок звучал каждый раз
    this.click.play().catch(() => {});
  }
}
