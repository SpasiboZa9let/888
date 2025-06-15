/**
 * Возвращает абсолютный URL до /photos/<file>
 * Работает локально и на GitHub Pages, потому что
 * в vite.config.js базовый префикс — "./".
 */
export const photo = (file) =>
  `${import.meta.env.BASE_URL || './'}photos/${file}`;
