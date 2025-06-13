const EMOJIS = ['💙', '💛', '💚', '💜'];

export function startEmojiSmall() {
  setInterval(() => {
    const markers = document.querySelectorAll('.marker');
    if (!markers.length) return;

    const randomMarker = markers[Math.floor(Math.random() * markers.length)];
    const rect = randomMarker.getBoundingClientRect();

    const el = document.createElement('div');
    el.className = 'emoji-small';
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

    el.style.position = 'fixed';
    el.style.left = `${rect.left + rect.width / 2}px`;
    el.style.top = `${rect.top + rect.height / 2}px`;
    el.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
    el.style.animationDuration = `${4 + Math.random() * 2}s`;

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 6000);
  }, 800);
}
