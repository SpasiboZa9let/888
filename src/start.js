// Стартовый контроллер: показывает старт-меню, потом динамически подгружает карту
document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const mainApp     = document.getElementById('main-app');
  const startBtn    = document.getElementById('start-button');
  const settingsBtn = document.getElementById('settings-button');
  const albumBtn    = document.getElementById('album-button');
  const backBtn = document.getElementById('back-to-start'); // 🆕 кнопка возврата


  // Проверяем процент прогресса, сохранённый картой
  const saved = parseFloat(localStorage.getItem('progressPercent')) || 0;
  if (saved >= 100) albumBtn.classList.remove('hidden');

  // ——— «Начать путь»
  startBtn.addEventListener('click', async () => {
    startScreen.classList.add('hidden');   // прячем меню
    mainApp.classList.remove('hidden');    // показываем карту (блок был скрыт)
    // Показываем кнопку, когда карта действительно загружена
   window.addEventListener('mapReady', () => {
   backBtn.classList.remove('hidden');      // кнопка видима
});

// Клик по «На старт» — возвращаемся к меню
backBtn.addEventListener('click', () => {
  // показать меню, скрыть карту
  startScreen.classList.remove('hidden');
  mainApp.classList.add('hidden');
  backBtn.classList.add('hidden');
});

    // динамический импорт основного кода карты
    const mapModule = await import('./index.js');
    // index.js должен экспортировать initMap()
    if (mapModule.initMap) mapModule.initMap();
  });

  // ——— «Фотоальбом»
  albumBtn.addEventListener('click', () => {
    if (!albumBtn.classList.contains('hidden')) window.location.href = 'album.html';
  });

  // ——— «Настройки» (заглушка)
  settingsBtn.addEventListener('click', () => {
    alert('Настройки пока не реализованы 🛠️');
  });
});
