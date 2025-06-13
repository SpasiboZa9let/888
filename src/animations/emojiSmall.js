const EMOJIS = ['💙', '💛', '💚', '💜'];

export function startEmojiSmall() {
  setInterval(() => {
    const el = document.createElement('div');
    el.className = 'emoji-small';
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

    el.style.left = `${Math.random() * 100}%`;
    el.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
    el.style.animationDuration = `${4 + Math.random() * 2}s`;

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 6000);
  }, 800); // каждые 0.8 секунды
}
