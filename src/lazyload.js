/**
 * Ленивый загрузчик <img data-src="...">
 * + эффект blur-up: картинка сначала размыта, потом плавно проясняется.
 */

document.addEventListener('DOMContentLoaded', () => {
  const candidates = document.querySelectorAll('img[data-src]');

  const load = (img) => {
    img.src = img.dataset.src;
    img.addEventListener(
      'load',
      () => img.classList.remove('blur-up'),
      { once: true }
    );
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting) return;
          load(target);
          obs.unobserve(target);
        });
      },
      { rootMargin: '150px' }
    );

    candidates.forEach((img) => {
      img.classList.add('blur-up');
      io.observe(img);
    });
  } else {
    // Фолбэк для старых браузеров
    candidates.forEach((img) => {
      img.classList.add('blur-up');
      load(img);
    });
  }
});
