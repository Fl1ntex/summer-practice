let seconds = 0;
let minutes = 0;
let timerId = null; // <-- сохраняем ID интервала сюда

function taymer_start() {
  if (timerId) clearInterval(timerId); // на всякий случай убираем старый

  timerId = setInterval(() => {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    const display = document.getElementById('timerDisplay');
    if (display) {
      display.textContent =
        String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    }
  }, 1000);
}

function taymer_stop() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}
