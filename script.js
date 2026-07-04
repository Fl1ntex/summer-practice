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
        spriteRunner(context, canvas, runner, person, keys, step_shag, step_jump, fondraw);
        person.tick_count = 0;
    }
    person.tick_count += 1;
    requestAnimationFrame(tick);
}



addEventListener("keydown", function(key){
    keys[key.code] = true;
});

addEventListener("keyup", function(key){
    keys[key.code] = false;
});