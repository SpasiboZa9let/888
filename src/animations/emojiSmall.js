// src/animations/emojiSmall.js

import { createEl, randomBetween } from '../utils/dom.js';

let intervalIdSmall = null;

/**
 * Запускает генерацию и анимацию маленьких эмодзи
 */
export function startSmall() {
  if (intervalIdSmall !== null) return; // не дублируем
  intervalIdSmall = setInterval(() => {
    const emoji = createEl('div', { className: 'emoji-small' });
    emoji.textContent = getRandomEmoji();
    document.body.appendChild(emoji);
    animate(emoji, 5000, 'float');
  }, 3000);
}

/**
 * Останавливает генерацию маленьких эмодзи
 */
export function stopSmall() {
  clearInterval(intervalIdSmall);
  intervalIdSmall = null;
}

function getRandomEmoji() {
  const list = ['🙂','😊','😎','😍','🤔','🎉'];
  return list[Math.floor(Math.random() * list.length)];
}

function animate(el, duration, floatClass) {
  // Случайная начальная позиция по горизонтали
  const startX = randomBetween(0, window.innerWidth);
  el.style.left = `${startX}px`;
  
  // Запускаем CSS-анимацию через добавление класса
  requestAnimationFrame(() => {
    el.classList.add(floatClass);
  });

  // Удаляем элемент после окончания анимации
  setTimeout(() => {
    el.remove();
  }, duration);
}

