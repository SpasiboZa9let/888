const base =
  (import.meta.env && import.meta.env.BASE_URL)  // есть при сборке Vite
    ? import.meta.env.BASE_URL
    : './';                                      // резерв на случай «сырого» скрипта

export const photo = (file) => `${base}photos/${file}`;
