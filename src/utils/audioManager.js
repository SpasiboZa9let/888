/* src/utils/audioManager.js
   Управляет фоновым лупом и кликовым семплом, поддерживает toggle 🔊 / 🔇 */

const base =
  (import.meta.env && import.meta.env.BASE_URL)
    ? import.meta.env.BASE_URL     // './' на GitHub Pages
    : './';

export default class AudioManager {
  constructor() {
    /* фоновый луп */
    this.bg = new Audio(`${base}audio/bg.mp3`);
    this.bg.loop   = true;
    this.bg.volume = 0.4;

    /* звук клика */
    this.click = new Audio(`${base}audio/click.mp3`);
    this.click.volume = 0.8;

    this.enabled = false;          // звук выключен до первого жеста
  }

  /* первый пользовательский клик включает звук */
  initOnce() {
    if (this.enabled) return;
    this.enabled = true;
    this.bg.play().catch(() => {});    // autoplay может задержаться – игнорируем
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled)  this.bg.play();
    else               this.bg.pause();
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) {
      this.initOnce();                 // авто-включение при первом клике
    }
    if (!this.enabled) return;         // если autoplay всё ещё заблокирован
    this.click.currentTime = 0;
    this.click.play().catch(() => {});
  }
}
