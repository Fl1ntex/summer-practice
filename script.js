let context = canvas.getContext('2d');
let bg = new Image();
let runner = new Image();

let strela1 = new Image();
let strela2 = new Image();
let strela3 = new Image();

strela1.src = "img/strela_1.PNG"
strela2.src = "img/strela_2.PNG"
strela3.src = "img/strela_3.PNG"

bg.src = "img/fon.png";
runner.src = "img/person.png";


let number_strelu = 1;

let step_shag = 18;
let step_jump = 20;
let bgOffset = 0;
let mapLength = canvas.width * 7;
let isPaused = false;
let escapePressed = false;

let kolichestvo_strel = 0;
let strely = []; // массив для хранения стрел
let speed_strel = 15; //  скорость полёта стрелы

let attackCooldown = 0; // кд по русски 
let attackDelay = 55;   // кадров между выстрелами

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