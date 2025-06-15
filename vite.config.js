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
  },

  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
});
