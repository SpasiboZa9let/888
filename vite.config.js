/**
 * Vite 5 + Rollup – конфиг с несколькими HTML-входами.
 * Копирует album.html и start.html в dist/, так что Pages найдёт их.
 */
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: true,

    // 👇 перечисляем все HTML-страницы, которые нужны в проде
    rollupOptions: {
      input: {
        main:  'index.html',
        album: 'album.html',
        start: 'start.html'   // добавь другие, если появятся
      }
    }
  },

  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
});
