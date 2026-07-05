const pauseScreen = document.getElementById('pause-screen');

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
