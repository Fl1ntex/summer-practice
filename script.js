let context = canvas.getContext('2d');
let bg = new Image();
let runner = new Image();

bg.src = "img/fon.png";
runner.src = "img/person.png";

let step_shag = 18;
let step_jump = 20;
let bgOffset = 0;
let mapLength = canvas.width *7;


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
    if(person.tick_count > 3){
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