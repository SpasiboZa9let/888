document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const settingsButton = document.getElementById('settings-button');
  const albumButton = document.getElementById('album-button');

  startButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  settingsButton.addEventListener('click', () => {
    alert('Здесь будут настройки яркости, звука и др.');
  });

  // Если достигнут 100% прогресс — покажем кнопку альбома
  const progress = localStorage.getItem('progressPercent');
  if (progress && parseFloat(progress) >= 100) {
    albumButton.classList.remove('hidden');
  }

  albumButton.addEventListener('click', () => {
    window.location.href = 'album.html';
  });
});
