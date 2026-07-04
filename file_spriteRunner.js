
function spriteRunner(context, canvas, runner, person, keys, step_shag, step_jump, fondraw){
    
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