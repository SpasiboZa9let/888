// src/utils/dom.js
export function createEl(tag, props = {}) {
  const el = document.createElement(tag);
  Object.assign(el, props);
  return el;
}

export function onResize(fn) {
  window.addEventListener('resize', fn);
}

export function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}
