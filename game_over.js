// ===== ПОДСЧЁТ ОЧКОВ =====
let totalScore = 0;

const SCORE_TABLE = {
    1: 15,  // орк 1 уровня — 15 очков
    2: 30,  // орк 2 уровня — 30 очков
    3: 50   // орк 3 уровня — 50 очков
};

function addScoreForOrc(level) {
    const points = SCORE_TABLE[level] || 0;
    totalScore += points;
    console.log(`+${points} очков! Всего: ${totalScore}`);
}

function getTotalScore() {
    return totalScore;
}

function resetScore() {
    totalScore = 0;
}

// ===== ЭКРАН КОНЦА ИГРЫ =====
function showGameOverScreen() {
    // скрываем меню паузы если оно открыто
    if (pauseScreen) pauseScreen.classList.remove('active');
    
    // создаём экран окончания игры
    const existing = document.getElementById('game-over-screen');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'game-over-screen';
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-align: center;
        z-index: 30;
        font-family: 'Press Start 2P', monospace;
    `;

    overlay.innerHTML = `
        <h1 style="font-size: 4rem; margin-bottom: 10px; color: #ff4444;">ИГРА ОКОНЧЕНА</h1>
        <p style="font-size: 2rem; margin: 20px 0;">Твой счёт:</p>
        <p style="font-size: 5rem; font-weight: bold; color: #ffd700; margin: 10px 0;">${totalScore}</p>
        <p style="font-size: 1.2rem; color: #aaa; margin-bottom: 30px;">очков</p>
        <button id="restart-btn" style="
            padding: 16px 48px;
            font-size: 1.5rem;
            font-family: 'Press Start 2P', monospace;
            cursor: pointer;
            border: none;
            border-radius: 12px;
            background: #4CAF50;
            color: white;
            transition: background 0.2s;
            box-shadow: 0 4px 0 #2b662e;
        ">Играть заново</button>
        <p style="font-size: 0.8rem; color: #666; margin-top: 20px;">(нажми R для рестарта)</p>
    `;

    document.body.appendChild(overlay);

    // кнопка рестарта
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.getElementById('restart-btn').addEventListener('mouseenter', function() {
        this.style.background = '#45a049';
    });
    document.getElementById('restart-btn').addEventListener('mouseleave', function() {
        this.style.background = '#4CAF50';
    });

    // рестарт по клавише R
    document.addEventListener('keydown', function restartHandler(e) {
        if (e.key === 'r' || e.key === 'R') {
            restartGame();
            document.removeEventListener('keydown', restartHandler);
        }
    });

    gameRunning = false;
    isPaused = false;
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

// ===== ПЕРЕЗАПУСК ИГРЫ =====
function restartGame() {
    // убираем экран окончания
    const overlay = document.getElementById('game-over-screen');
    if (overlay) overlay.remove();

    // сбрасываем счёт
    resetScore();

    // сбрасываем персонажа
    person.HP = max_hp;
    person.MP = max_mp;
    person.x_pos = 20;
    person.y_pos = 350;
    person.isJamp = false;
    person.jumpTick = 0;

    // сбрасываем орков
    orcs = [];

    // сбрасываем стрелы
    strely = [];

    // сбрасываем таймер
    seconds = 0;
    minutes = 0;
    const display = document.getElementById('timerDisplay');
    if (display) display.textContent = '00:00';

    // сбрасываем счётчик убийств
    countK = 0;
    document.getElementById('kill-count').textContent = '0';

    // сбрасываем кулдауны
    cooldown1 = 0;
    cooldown3 = 0;
    cooldown4 = 0;

    // показываем стартовое меню
    const startMenu = document.getElementById('start-menu');
    if (startMenu) startMenu.style.display = 'flex';

    // останавливаем игру
    gameRunning = false;
    isPaused = false;
    taymer_stop();

    console.log('Игра перезапущена!');
}

// ===== ПРОВЕРКА УСЛОВИЙ ПОРАЖЕНИЯ =====
function checkGameOver() {
    // если ХП <= 0 — проигрыш
    if (person.HP <= 0) {
        showGameOverScreen();
        return true;
    }

    // если дошли до конца карты — ПОБЕДА!
    // worldX — позиция персонажа относительно карты
    const worldX = person.x_pos - bgOffset;
    if (worldX + person.x_razmer_na_canvas >= mapLength) {
        showGameOverScreen();
        return true;
    }

    return false;
}