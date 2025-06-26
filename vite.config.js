// vite.config.js
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  // чтобы всё шло по относительным путям из той же папки, где лежит index.html
  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // мульти-HTML-ским: собираем index.html, album.html, start.html
    rollupOptions: {
      input: {
        main:  'index.html',
        album: 'album.html',
        start: 'start.html'
      }
    }
  },

  plugins: [
    // оставляем только поддержку старых браузеров
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
});
