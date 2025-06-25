/* ---------- импорты ---------- */
import { MARKERS }           from './data/markers.js';
import MapRenderer           from './components/MapRenderer.js';
import MemoryPanel           from './components/MemoryPanel.js';
import { startEmojiSmall }   from './animations/emojiSmall.js';
import { startEmojiLarge }   from './animations/emojiLarge.js';
import { drawRoute }         from './utils/drawRoute.js';

/* ---------- инициализация карты ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const panel = new MemoryPanel('#memory-panel');
  /* создаём булавки */
  new MapRenderer('#map', MARKERS, panel);
  /* дорисовать пунктир после вставки пинов */
  setTimeout(drawRoute, 100);

  /* подкрутим сами булавки: добавим мини-фото прямо в кружок */
  injectPinThumbnails();
});

/* ---------- превью внутри булавок ---------- */
function injectPinThumbnails() {
  /* HTMLElement.marker создаёт MapRenderer — берём их по порядку */
  const pins = document.querySelectorAll('#map .marker');
  pins.forEach((pin, idx) => {
    const data = MARKERS[idx];
    if (!data) return;                     // защита на всякий

    /* Прикрепляем картинку как фон кружка булавки */
    pin.style.width              = '40px';
    pin.style.height             = '40px';
    pin.style.borderRadius       = '50%';
    pin.style.backgroundSize     = 'cover';
    pin.style.backgroundPosition = 'center';
    pin.style.backgroundImage    = `url(${data.img})`;
  });
}

/* ---------- прогресс-бар ----------- */
window.setupProgressBar = function () {
  const markers     = document.querySelectorAll('.marker');
  const progressBar = document.getElementById('progress-bar');
  const albumBtn    = document.getElementById('open-album');

  if (!markers.length || !progressBar) return;

  const viewed = new Set();

  markers.forEach((marker, index) => {
    marker.addEventListener('mouseenter', () => {
      if (viewed.has(index)) return;

      viewed.add(index);
      progressBar.style.width =
        `${(viewed.size / markers.length) * 100}%`;

      /* все 10 пройдены → анимация бар + открываем кнопку альбома */
      if (viewed.size === markers.length) {
        progressBar.style.background =
          'repeating-linear-gradient(135deg,#4b3621,#4b3621 4px,#7a5c3e 4px,#7a5c3e 8px)';
        progressBar.style.boxShadow =
          '0 0 6px rgba(75,54,33,.5)';
        progressBar.style.height = '14px';

        albumBtn?.classList.remove('hidden');
        albumBtn?.classList.add   ('visible');
      }
    });
  });
};
