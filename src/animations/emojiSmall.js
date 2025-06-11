const EMOJIS = ['😊', '🌟', '☀️', '🍃', '💧'];

export function startEmojiSmall() {
  setInterval(() => {
    const el = document.createElement('div');
    el.className = 'emoji-small';
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    el.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }, 3000);
}
