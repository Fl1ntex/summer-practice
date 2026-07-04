function spriteRunner(){
    
    let centerX = canvas.width / 2 - person.x_razmer_na_canvas;
    let worldX = person.x_pos - bgOffset;

    if (keys['KeyA'] && keys['KeyD'] && person.isJamp == 0) {
        person.y_padding = 0;
        person_AFK();
        fondraw();
        context.drawImage(runner, person.x_padding, person.y_padding, 120, 130, person.x_pos, person.y_pos, person.x_razmer_na_canvas, person.y_razmer_na_canvas);
        return;
    }

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
        if (person.x_padding >= 1080) {
            person.x_padding = 0;
        } else {
            person.x_padding += 120;
        }
    }
    
    else if (keys['KeyD']) {
        if (person.x_pos < centerX) {
            person.x_pos += step_shag;
        } else if (-bgOffset + canvas.width < mapLength) {
            bgOffset -= step_shag;
            person.x_pos = centerX;
        } else if (worldX + 80 < mapLength) {
            person.x_pos += step_shag;
        }
        person.y_padding = 910;
        if (person.x_padding >= 1080) {
            person.x_padding = 0;
        } else {
            person.x_padding += 120;
        }
    }
    else{
        person.y_padding = 0;
        person_AFK();
    }

    if (!keys['KeyA'] && !keys['KeyD']) {
        person.y_padding = 0;
        person_AFK();
    }

    if (keys['Space'] && !person.isJamp) {
        person.isJamp = true;
        person.jumpTick = 0;
    }

    

    if (person.isJamp) {
        jumpFunction();
    }

    if (keys['KeyA'] || keys['KeyD']) {
        if (person.x_padding >= 1080) {
            person.x_padding = 0;
        } else {
            person.x_padding += 120;
        }
    }
    
    
    
    fondraw();
    context.drawImage(runner, person.x_padding, person.y_padding, 120, 130, person.x_pos, person.y_pos, person.x_razmer_na_canvas, person.y_razmer_na_canvas);
}