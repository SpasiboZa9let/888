// src/utils/dom.js

/**
 * Создаёт HTML-элемент и сразу присваивает ему свойства.
 * @param {string} tag — имя тега, например 'div' или 'span'
 * @param {Object} props — объект свойств (className, textContent, атрибуты и т.п.)
 * @returns {HTMLElement}
 */
export function createEl(tag, props = {}) {
  const el = document.createElement(tag);
  Object.assign(el, props);
  return el;
}

/**
 * Вешает обработчик на изменение размеров окна.
 * @param {Function} fn — функция, которая будет вызвана при изменении размера
 */
export function onResize(fn) {
  window.addEventListener('resize', fn);
}

/**
 * Возвращает случайное число между min и max (включительно для дробей).
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

