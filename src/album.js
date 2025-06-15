/**
 * Альбом фотографий.
 * Пути вычисляются динамически от расположения этого файла, поэтому
 * код одинаково работает и в корне сайта, и в подпапке (GitHub Pages).
 * — Шаг 1: выравниваем пути, убираем хардкод «/888/…».
 */

const baseURL = new URL('../assets/photos/', import.meta.url);

const albumPhotos = [
  { src: new URL('1.jpg',  baseURL).href, caption: 'Первое воспоминание' },
  { src: new URL('2.jpg',  baseURL).href, caption: 'Тёплое солнце в июле' },
  { src: new URL('3.jpg',  baseURL).href, caption: 'Шумный вечер на юге' },
  { src: new URL('4.jpg',  baseURL).href, caption: 'Тень забытого переулка' },
  { src: new URL('5.jpg',  baseURL).href, caption: 'Тень забытого переулка' },
  { src: new URL('6.jpg',  baseURL).href, caption: 'Тень забытого переулка' },
  { src: new URL('7.jpg',  baseURL).href, caption: 'Тень забытого переулка' },
  { src: new URL('8.jpg',  baseURL).href, caption: 'Тень забытого переулка' },
  { src: new URL('9.jpg',  baseURL).href, caption: 'Тень забытого переулка' },
  { src: new URL('10.jpg', baseURL).href, caption: 'Тень забытого переулка' }
];

let currentIndex = 0;

window.addEventListener('DOMContentLoaded', () => {
  /* Основные DOM-узлы */
  const modal     = document.getElementById('album-modal');
  const photoEl   = document.getElementById('album-photo');
  const captionEl = document.getElementById('album-caption');
  const albumBtn  = document.getElementById('open-album');
  const prevBtn   = document.querySelector('.prev');
  const nextBtn   = document.querySelector('.next');

  if (!modal || !photoEl || !captionEl || !prevBtn || !nextBtn) {
    console.error('⛔ Не найдены DOM-элементы альбома.');
    return;
  }

  /* Небольшая оптимизация: подсказываем браузеру, что картинку можно
     декодировать асинхронно и подгружать лениво. */
  photoEl.decoding = 'async';
  photoEl.loading  = 'lazy';

  function showPhoto(index) {
    const photo = albumPhotos[index];
    photoEl.src = photo.src;
    captionEl.textContent = photo.caption;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + albumPhotos.length) % albumPhotos.length;
    showPhoto(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % albumPhotos.length;
    showPhoto(currentIndex);
  });

  if (albumBtn) {
    albumBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      showPhoto(currentIndex);
    });
  }

  /* Закрытие по клику вне кадра */
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  /* Показываем первый кадр сразу */
  showPhoto(currentIndex);
});
