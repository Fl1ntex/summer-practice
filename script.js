let context = canvas.getContext('2d');
let bg = new Image();
let runner = new Image();


bg.src = "img/fon.png";
runner.src = "img/person.png";

let step_shag = 18;
let step_jump = 20;
let bgOffset = 0;
let mapLength = canvas.width * 7;


let person = {
    x_padding: 0,
    y_padding: 0,
    tick_count: 0,
    x_pos: 0,
    y_pos: 350,
    isJamp: false,
    jumpTick: 0,
    x_razmer_na_canvas: 80,
    y_razmer_na_canvas: 87
}

let keys = {};

bg.onload = function(){
    fondraw();
    tick();
}


addEventListener("keydown", function(key){
    keys[key.code] = true;
});

addEventListener("keyup", function(key){
    keys[key.code] = false;
});