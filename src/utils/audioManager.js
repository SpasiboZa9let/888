/* src/utils/audioManager.js
   Фоновый луп + звук клика, кнопка 🔊 / 🔇 */

const root = `${window.location.origin}${import.meta.env.BASE_URL}`;
// root = "https://spasiboza9let.github.io/888/"

export default class AudioManager {
  constructor() {
    /* фоновый луп */
    this.bg = new Audio(`${root}audio/bg.mp3`);
    this.bg.loop   = true;
    this.bg.volume = 0.4;

    /* звук клика */
    this.click = new Audio(`${root}audio/click.mp3`);
    this.click.volume = 0.8;

    this.enabled = false;          // звук выключен до первого жеста
  }

  /* первый пользовательский клик включает звук */
  initOnce() {
    if (this.enabled) return;
    this.enabled = true;
    this.bg.play().catch(() => {});    // блокировку autoplay игнорируем
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
