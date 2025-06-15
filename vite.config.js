/**
 * Vite 5 конфиг без imagemin.
 * Относительные пути (base:'./') → сайт работает из подпапки GitHub Pages.
 */

import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: true
  rollupOptions: {
    input: {
    main:  'index.html',
    album: 'album.html',
    start: 'start.html'   // ← если нужна ещё страница — допиши сюда
      }
  },

  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
});
