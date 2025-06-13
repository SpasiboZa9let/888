export default class MemoryPanel {
  constructor(selector) {
    this.panelEl = document.querySelector(selector);
    this.imageEl = this.panelEl.querySelector("img");
    this.textEl = this.panelEl.querySelector(".text");
  }

  showMemory(memory) {
    this.imageEl.src = memory.img;
    this.textEl.textContent = memory.text;

    // Добавляем класс для плавного появления
    requestAnimationFrame(() => {
      this.panelEl.classList.add("show");
    });
  }

  hideMemory() {
    this.panelEl.classList.remove("show");

    // Ждём, пока исчезнет, и очищаем контент
    setTimeout(() => {
      this.imageEl.src = "";
      this.textEl.textContent = "";
    }, 300);
  }
}
