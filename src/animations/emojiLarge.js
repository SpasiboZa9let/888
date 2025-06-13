const EMOJIS = ['💙', '💛', '💚', '💜'];

export function startEmojiLarge() {
  setInterval(() => {
    const el = document.createElement('div');
    el.className = 'emoji-large';
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

    el.style.left = `${Math.random() * 100}%`;
    el.style.fontSize = `${1.5 + Math.random() * 1.5}rem`;
    el.style.animationDuration = `${5 + Math.random() * 3}s`;

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 8000);
  }, 1300); // каждые 1.3 секунды
}
