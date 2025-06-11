const EMOJIS_LARGE = ['🔥', '💥', '🎉', '✨'];

export function startEmojiLarge() {
  setInterval(() => {
    const el = document.createElement('div');
    el.className = 'emoji-large';
    el.textContent = EMOJIS_LARGE[Math.floor(Math.random() * EMOJIS_LARGE.length)];
    el.style.left = `${Math.random() * 100}vw`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 6000);
  }, 2500);
}
