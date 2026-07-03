let context = canvas.getContext('2d');
let bg = new Image();
let runner = new Image();

bg.src = "img/fon.png";
runner.src = "img/person.png";

let step_shag = 15;
let step_jump = 15;


let person = {
    x_padding: 0,
    y_padding: 0,
    tick_count: 0,
    x_pos: 0,
    y_pos: 320,
    isJamp: false,
    jumpTick: 0
}

let keys = {};


bg.onload = function(){
    fondraw();
    tick();
}

function fondraw(){
    context.drawImage(bg, 0, 0);
}

function tick(){
    if (person.tick_count > 20){
        spriteRunner();
        person.tick_count = 0;
    }
    person.tick_count += 1;
    requestAnimationFrame(tick);
}

function spriteRunner(){
    
    if (keys['KeyA']) {
        if (person.x_pos > 0) {
            person.x_pos -= step_shag;
            person.y_padding = 650;
        }
    }
    
    if (keys['KeyD']) {
        if (person.x_pos < canvas.width - 108) { // 108 ширина игрока 
            person.x_pos += step_shag;
            person.y_padding = 910;
        }
    }
    if (!keys['KeyA'] && !keys['KeyD']) {
        person.y_padding = 0;
        person.x_padding = 0;
    }

    if (keys['KeyW'] && !person.isJamp) {
        person.isJamp = true;
        person.jumpTick = 0;
    }

    if (person.isJamp) {
        person.jumpTick += 1;
        
        if (person.jumpTick <= 7) {
            person.y_pos -= step_jump;  
        } else if (person.jumpTick <= 13) {
            person.y_pos += step_jump;  
        } else {
            person.isJamp = false;
            person.y_pos = 320;
            person.jumpTick = 0;
        }
    }

    
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if (person.x_padding == 240) {
        person.x_padding = 0;
    } else {
        person.x_padding += 120;
    }
    
    fondraw();
    context.drawImage(runner, person.x_padding, person.y_padding, 120, 130, person.x_pos, person.y_pos, 108, 117);
}


addEventListener("keydown", function(key){
    keys[key.code] = true;
});

addEventListener("keyup", function(key){
    keys[key.code] = false;
});