/**
 * Возвращает абсолютный URL до /photos/<file>
 * Работает одинаково локально и на GitHub Pages,
 * потому что BASE_URL = './' при base:'./' в vite.config.js
 */
export const photo = (file) =>
  `${import.meta.env.BASE_URL || './'}photos/${file}`;
