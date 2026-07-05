function spriteRunner(){
    
    let centerX = canvas.width / 2 - person.x_razmer_na_canvas;
    let worldX = person.x_pos - bgOffset;

    if (keys['KeyA'] && keys['KeyD']) { // если A и D зажаты 
        key_on_AD(centerX, worldX);
        return;
    }
    

    if (keys['KeyA']) {
        key_on_A(centerX, worldX);
    }
    
    else if (keys['KeyD']) {
        key_on_D(centerX, worldX);
    }

    else{ // если ни одна кнопка не нажата аницмаци моргания 
        person.y_padding = 0;
        person_AFK();
    }

    if (!keys['KeyA'] && !keys['KeyD']) {  // если A и D зажаты анимаци моргания 
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