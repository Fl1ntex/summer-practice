const pauseScreen = document.getElementById('pause-screen');
let isPaused = false;

// Переключение паузы по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        togglePause();
    }
});

function togglePause() {
    if (!gameRunning) return; // не ставим на паузу, если игра ещё не началась

    isPaused = !isPaused;

    if (isPaused) {
        pauseScreen.classList.add('active');
    } else {
        pauseScreen.classList.remove('active');
    }
}