// src/animations/emojiLarge.js

import { createEl, randomBetween } from '../utils/dom.js';

let intervalIdLarge = null;

/**
 * Запускает генерацию и анимацию больших эмодзи
 */
export function startLarge() {
  if (intervalIdLarge !== null) return; // уже запущено
  intervalIdLarge = setInterval(() => {
    const emoji = createEl('div', { className: 'emoji-large' });
    emoji.textContent = getRandomEmojiLarge();
    document.body.appendChild(emoji);
    animate(emoji, 6000, 'float-large');
  }, 2500);
}

/**
 * Останавливает генерацию больших эмодзи
 */
export function stopLarge() {
  clearInterval(intervalIdLarge);
  intervalIdLarge = null;
}

function getRandomEmojiLarge() {
  const list = ['🌟','💖','✨','🔥','☀️','🌈'];
  return list[Math.floor(Math.random() * list.length)];
}

function animate(el, duration, floatClass) {
  const startX = randomBetween(0, window.innerWidth);
  el.style.left = `${startX}px`;
  requestAnimationFrame(() => {
    el.classList.add(floatClass);
  });
  setTimeout(() => {
    el.remove();
  }, duration);
}

