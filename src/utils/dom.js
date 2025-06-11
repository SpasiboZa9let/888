// Утилиты для querySelector
export function qs(sel, parent = document) {
  return parent.querySelector(sel);
}
