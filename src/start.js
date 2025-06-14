document.addEventListener('DOMContentLoaded', () => {
  // Кнопка "Начать путь"
  const startBtn = document.getElementById('start-button');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  // Кнопка "Настройки"
  const settingsBtn = document.getElementById('settings-button');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      alert('Настройки пока не реализованы 🛠️');
      // Здесь позже можно открыть модальное окно с настройками
    });
  }

  // Кнопка "Фотоальбом"
  const albumBtn = document.getElementById('album-button');
  if (albumBtn) {
    const progress = localStorage.getItem('progress') || 0;
    if (progress >= 100) {
      albumBtn.classList.remove('hidden');
    } else {
      albumBtn.classList.add('hidden');
    }

    albumBtn.addEventListener('click', () => {
      window.location.href = 'album.html';
    });
  }
});
