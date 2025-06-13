const EMOJIS = ['💙', '💛', '💚', '💜'];

export function startEmojiLarge() {
  setInterval(() => {
    const markers = document.querySelectorAll('.marker');
    if (!markers.length) return;

    const randomMarker = markers[Math.floor(Math.random() * markers.length)];
    const rect = randomMarker.getBoundingClientRect();

    const el = document.createElement('div');
    el.className = 'emoji-large';
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

    el.style.position = 'fixed';
    el.style.left = `${rect.left + rect.width / 2}px`;
    el.style.top = `${rect.top + rect.height / 2}px`;
    el.style.fontSize = `${1.5 + Math.random() * 1.5}rem`;
    el.style.animationDuration = `${5 + Math.random() * 3}s`;

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 8000);
  }, 1300);
}
