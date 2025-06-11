
const emojis = ['🙂', '😌', '☁️', '🫧'];
function createEmoji() {
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = 'absolute';
    emoji.style.left = Math.random() * window.innerWidth + 'px';
    emoji.style.top = window.innerHeight + 'px';
    emoji.style.fontSize = (Math.random() * 24 + 16) + 'px';
    emoji.style.opacity = 0.6;
    emoji.style.transition = 'top 15s linear';
    emoji.style.zIndex = '0';
    document.getElementById('floating-emojis').appendChild(emoji);
    setTimeout(() => {
        emoji.style.top = '-50px';
    }, 100);
    setTimeout(() => {
        emoji.remove();
    }, 16000);
}
setInterval(createEmoji, 3000);
