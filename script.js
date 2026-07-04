let context = canvas.getContext('2d');
let bg = new Image();
let runner = new Image();

// Элементы меню
const startScreen = document.getElementById('start-menu');
const nicknameInput = document.getElementById('nickname');
const startBtn = document.getElementById('start-btn');

bg.src = "img/fon.png";
runner.src = "img/person.png";

let step_shag = 18;
let step_jump = 20;
let bgOffset = 0;
let mapLength = canvas.width *7;
let gameRunning = false;          // флаг: запущена ли игра
let playerNickname = 'Игрок';    // ник по умолчанию

let person = {
    x_padding: 0,
    y_padding: 0,
    tick_count: 0,
    x_pos: 0,
    y_pos: 350,
    isJamp: false,
    jumpTick: 0
}

let keys = {};

// Включаем/выключаем кнопку в зависимости от того, есть ли ник
nicknameInput.addEventListener('input', () => {
  const nick = nicknameInput.value.trim();
  startBtn.disabled = nick.length <= 2;
});

// Кнопка СТАРТ
startBtn.addEventListener('click', () => {
    const nick = nicknameInput.value.trim();
    if (nick) {
        playerNickname = nick;
    }
    startScreen.style.display = 'none';
    gameRunning = true;
})
nicknameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') startBtn.click();
});

bg.onload = function(){
    fondraw();
    tick();
}

function fondraw(){
    for (let i = 0; i < 9; i++) {
        context.drawImage(bg, bgOffset + i * bg.width, 0);
    }
}

function tick(){
    if (!gameRunning) {
        requestAnimationFrame(tick);
        return;
    }

    if(person.tick_count > 5){
        spriteRunner();
        person.tick_count = 0;
    }
    person.tick_count+=1;
    requestAnimationFrame(tick);
}

addEventListener("keydown", function(key){
    keys[key.code] = true;
});

addEventListener("keyup", function(key){
    keys[key.code] = false;
});