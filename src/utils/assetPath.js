
const base =
  (typeof import.meta !== 'undefined' &&
   import.meta.env       &&           // import.meta.env есть ТОЛЬКО после сборки
   import.meta.env.BASE_URL) ||       // '/888/' в готовом билде
  './';                               // хоть что-то в сыром виде

export function photo(name) {
  return `${base}photos/${name}`;      // 👉 '/888/photos/1.jpg'
}
