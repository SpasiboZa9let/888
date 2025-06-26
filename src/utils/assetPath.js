/**
 * BASE_URL подставляет Vite:
 *   • dev-сервер → '/'
 *   • github.io/888 → '/888/'
 *   • cordova www  → './'
 */
const base =
  (import.meta.env && import.meta.env.BASE_URL) || './';

export const photo = file => `${base}photos/${file}`;
export const audio = file => `${base}audio/${file}`;
export const icon  = ()   => `${base}photos/favicon.ico`;
