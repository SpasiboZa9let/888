// src/animations/emojiSmall.js
import { createEl, randomBetween } from '../utils/dom.js';
let intervalIdSmall = null;

export function startSmall() {
  if (intervalIdSmall !== null) return;
  intervalIdSmall = setInterval(() => {
    const emoji = createEl('div', { className: 'emoji-small' });
    emoji.textContent = getRandomEmoji();
    document.body.appendChild(emoji);
    animate(emoji, 5000, 'float');
  }, 3000);
}

export function stopSmall() {
  clearInterval(intervalIdSmall);
  intervalIdSmall = null;
}

function getRandomEmoji() {
  const list = ['🙂','😊','😎','😍','🤔','🎉'];
  return list[Math.floor(Math.random() * list.length)];
}

function animate(el, duration, floatClass) {
  const startX = randomBetween(0, window.innerWidth);
  el.style.left = `${startX}px`;
  requestAnimationFrame(() => el.classList.add(floatClass));
  setTimeout(() => el.remove(), duration);
}
