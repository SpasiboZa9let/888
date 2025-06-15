import { photo } from './utils/assetPath.js';

const albumPhotos = [
  { src: photo('1.jpg'),  caption: 'Первое воспоминание' },
  { src: photo('2.jpg'),  caption: 'Тёплое солнце в июле' },
  { src: photo('3.jpg'),  caption: 'Шумный вечер на юге' },
  { src: photo('4.jpg'),  caption: 'Тень забытого переулка' },
  { src: photo('5.jpg'),  caption: 'Тень забытого переулка' },
  { src: photo('6.jpg'),  caption: 'Тень забытого переулка' },
  { src: photo('7.jpg'),  caption: 'Тень забытого переулка' },
  { src: photo('8.jpg'),  caption: 'Тень забытого переулка' },
  { src: photo('9.jpg'),  caption: 'Тень забытого переулка' },
  { src: photo('10.jpg'), caption: 'Тень забытого переулка' }
];

let i = 0;

window.addEventListener('DOMContentLoaded', () => {
  const $modal   = document.getElementById('album-modal');
  const $img     = document.getElementById('album-photo');
  const $caption = document.getElementById('album-caption');
  const $prev    = document.querySelector('.prev');
  const $next    = document.querySelector('.next');
  const $open    = document.getElementById('open-album');

  if (!$modal || !$img) return console.error('⛔ album: нет DOM-узлов');

  $img.decoding = 'async';
  $img.loading  = 'lazy';

  const show = (idx) => {
    const p = albumPhotos[idx];
    $img.src          = p.src;
    $caption.textContent = p.caption;
  };

  $prev.onclick = () => { i = (i + albumPhotos.length - 1) % albumPhotos.length; show(i); };
  $next.onclick = () => { i = (i + 1) % albumPhotos.length; show(i); };
  $open?.addEventListener('click', () => { $modal.classList.remove('hidden'); show(i); });
  $modal.addEventListener('click', (e) => { if (e.target === $modal) $modal.classList.add('hidden'); });

  show(i);
});
