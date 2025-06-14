
const albumBtn = document.getElementById('album-btn');
const progress = parseInt(localStorage.getItem('progress'), 10) || 0;

if (progress >= 100) {
  albumBtn.disabled = false;
}

document.getElementById('start-btn').addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.getElementById('album-btn').addEventListener('click', () => {
  if (progress >= 100) {
    window.location.href = 'album.html';
  }
});

document.getElementById('settings-btn').addEventListener('click', () => {
  alert('Настройки пока не реализованы.');
});
