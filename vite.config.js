// vite.config.js
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig(({ mode }) => ({
 
  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:  'index.html',
        album: 'album.html',
        start: 'start.html'
      }
    }
  },

  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
}));
