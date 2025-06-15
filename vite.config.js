import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { imageminPlugin } from 'vite-plugin-imagemin';

export default defineConfig({
  /* Относительные пути → сайт будет работать и из корня домена, и из подпапки */
  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: true
  },

  plugins: [
    /* Автосборка полифиллов для старых браузеров */
    legacy({
      targets: ['defaults', 'not IE 11']
    }),

    /* Сжатие картинок + генерация WebP/AVIF ― запас на будущее */
    imageminPlugin({
      gifsicle: { optimizationLevel: 3 },
      mozjpeg:  { quality: 75 },
      pngquant: { quality: [0.65, 0.85] },
      svgo:     false,
      webp:     { quality: 75 },
      avif:     { quality: 50 }
    })
  ]
});
