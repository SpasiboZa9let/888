-import { imageminPlugin } from 'vite-plugin-imagemin';
+// (imagemin временно убрали)

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
-    ,imageminPlugin({
-      gifsicle: { optimizationLevel: 3 },
-      mozjpeg:  { quality: 75 },
-      pngquant: { quality: [0.65, 0.85] },
-      svgo:     false,
-      webp:     { quality: 75 },
-      avif:     { quality: 50 }
-    })
   ]
 });
