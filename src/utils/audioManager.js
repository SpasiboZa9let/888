/* src/utils/audioManager.js
   Фоновый луп + звук клика, кнопка 🔊 / 🔇 */

export default class AudioManager {
  constructor() {
    /* --- фоновый луп --- */
    // Относительный путь → Vite сам добавит префикс base в проде,
    // а при dev/preview будет работать как есть.
    this.bg = new Audio('./audio/bg.mp3');
    this.bg.loop   = true;
    this.bg.volume = 0.4;

    /* --- звук клика --- */
    this.click = new Audio('./audio/click.mp3');
    this.click.volume = 0.8;

    this.enabled = false;            // звук выключен до первого жеста
  }

  /* первый пользовательский клик включает звук */
  initOnce() {
    if (this.enabled) return;
    this.enabled = true;
    // если autoplay заблокирован, просто игнорируем ошибку
    this.bg.play().catch(() => {});
  }

  toggle() {
    this.enabled = !this.enabled;
    this.enabled ? this.bg.play() : this.bg.pause();
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) this.initOnce();   // авто-включение при первом клике
    if (!this.enabled) return;            // если autoplay всё ещё запрещён
    this.click.currentTime = 0;
    this.click.play().catch(() => {});
  }
}
