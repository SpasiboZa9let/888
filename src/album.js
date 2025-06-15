/**
 * Альбом фотографий.
 * Картинки лежат в public/photos/
 * import.meta.env.BASE_URL = './' при GitHub Pages → ссылки вида 'photos/1.jpg'
 */

const base = import.meta.env.BASE_URL || './';

const albumPhotos = [
  { src: `${base}photos/1.jpg`,  caption: 'Первое воспоминание' },
  { src: `${base}photos/2.jpg`,  caption: 'Тёплое солнце в июле' },
  { src: `${base}photos/3.jpg`,  caption: 'Шумный вечер на юге' },
  { src: `${base}photos/4.jpg`,  caption: 'Тень забытого переулка' },
  { src: `${base}photos/5.jpg`,  caption: 'Тень забытого переулка' },
  { src: `${base}photos/6.jpg`,  caption: 'Тень забытого переулка' },
  { src: `${base}photos/7.jpg`,  caption: 'Тень забытого переулка' },
  { src: `${base}photos/8.jpg`,  caption: 'Тень забытого переулка' },
  { src: `${base}photos/9.jpg`,  caption: 'Тень забытого переулка' },
  { src: `${base}photos/10.jpg`, caption: 'Тень забытого переулка' }
];

let currentIndex = 0;

window.addEventListener('DOMContentLoaded', () => {
  const modal     = document.getElementById('album-modal');
  const photoEl   = document.getElementById('album-photo');
  const captionEl = document.getElementById('album-caption');
  const albumBtn  = document.getElementById('open-album');
  const prevBtn   = document.querySelector('.prev');
  const nextBtn   = document.querySelector('.next');

  if (!modal || !photoEl) {
    console.error('⛔ Не найдены DOM-элементы альбома.');
    return;
  }

  photoEl.decoding = 'async';
  photoEl.loading  = 'lazy';

  function showPhoto(i) {
    const p = albumPhotos[i];
    photoEl.src = p.src;
    captionEl.textContent = p.caption;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + albumPhotos.length - 1) % albumPhotos.length;
    showPhoto(currentIndex);
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % albumPhotos.length;
    showPhoto(currentIndex);
  });

  albumBtn?.addEventListener('click', () => {
    modal.classList.remove('hidden');
    showPhoto(currentIndex);
  });

  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });

  showPhoto(currentIndex);
});
