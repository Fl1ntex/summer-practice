let seconds = 0;
let minutes = 0;
setInterval(() => {
    seconds++;
    if (seconds >= 60) { seconds = 0; minutes++; }
    document.getElementById('timerDisplay').textContent = 
        String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
}, 1000);