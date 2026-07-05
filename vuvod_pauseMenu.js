const pauseScreen = document.getElementById('pause-screen');
let isPaused = false;

// Переключение паузы по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        togglePause();
    }
});

function togglePause() {
  if (!gameRunning) return;

  isPaused = !isPaused;

  if (isPaused) {
    pauseScreen.classList.add('active');
    taymer_stop(); // останавливаем таймер
  } else {
    pauseScreen.classList.remove('active');
    taymer_start(); // продолжаем с тех же minutes/seconds
  }
}
