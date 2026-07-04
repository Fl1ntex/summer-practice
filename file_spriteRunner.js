function spriteRunner(){
    
    let centerX = canvas.width / 2 - person.x_razmer_na_canvas;
    let worldX = person.x_pos - bgOffset;

    if (keys['KeyA']) {
        if (person.x_pos > centerX) {
            person.x_pos -= step_shag;
        } else if (bgOffset < 0) {
            bgOffset += step_shag;
            person.x_pos = centerX; 
        } else if (worldX > 0) {
            person.x_pos -= step_shag;
        }
        person.y_padding = 650;
    }
    
    if (keys['KeyD']) {
        if (person.x_pos < centerX) {
            person.x_pos += step_shag;
        } else if (-bgOffset + canvas.width < mapLength) {
            bgOffset -= step_shag;
            person.x_pos = centerX;
        } else if (worldX + 80 < mapLength) {
            person.x_pos += step_shag;
        }
        person.y_padding = 910;
    }

    if (!keys['KeyA'] && !keys['KeyD']) {
        person.y_padding = 0;
        person.x_padding= -120;
    }

    if (keys['Space'] && !person.isJamp) {
        person.isJamp = true;
        person.jumpTick = 0;
    }

    if (person.isJamp) {
        person.jumpTick +=1;
        
        if (person.jumpTick <= 4) {
            person.y_pos -= step_jump;  
        } else if (person.jumpTick <= 8) {
            person.y_pos += step_jump;  
        } else {
            person.isJamp = false;
            person.y_pos = 350;
            person.jumpTick = 0;
        }
    }

    
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if (person.y_padding == 0){
        if (person.x_padding == 240) {
            person.x_padding = 0;
        } 
        else {
            person.x_padding += 120;
        }
    }
    else {
        if (person.x_padding == 1080) {
            person.x_padding = 0;
        } 
        else {
            person.x_padding += 120;
        }
    }
    
    fondraw();
    context.drawImage(runner, person.x_padding, person.y_padding, 120, 130, person.x_pos, person.y_pos, person.x_razmer_na_canvas, person.y_razmer_na_canvas);
}