const startScreen = document.getElementById('start-menu');
const nicknameInput = document.getElementById('nickname');
const startBtn = document.getElementById('start-btn');

let gameRunning = false;
let playerNickname = 'Игрок';

nicknameInput.addEventListener('input', () => {
    const nick = nicknameInput.value.trim();
    startBtn.disabled = nick.length <= 2;
});

startBtn.addEventListener('click', () => {
    const nick = nicknameInput.value.trim();
    if (nick) {
        playerNickname = nick;
    }
    startScreen.style.display = 'none';
    gameRunning = true;

    taymer_start();
});

nicknameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') startBtn.click();
});

