// src/utils/assetPath.js

// Учитываем базовый URL, заданный в vite.config.js (import.meta.env.BASE_URL),
// например '/' в режиме разработки или '/888/' при деплое на GitHub Pages.
const base = import.meta.env.BASE_URL || '/';

/**
 * Возвращает корректный URL к фото с учётом базового пути.
 *
 * @param {string} filename — имя файла в папке public/photos
 * @returns {string} полный путь к ресурсу, например '/888/photos/1.jpg'
 */
export function photo(filename) {
  return `${base}photos/${filename}`;
}
