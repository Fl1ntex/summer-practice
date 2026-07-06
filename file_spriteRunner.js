function spriteRunner(){
    
    let centerX = canvas.width / 2 - person.x_razmer_na_canvas;
    let worldX = person.x_pos - bgOffset;
    
     if (keys["Escape"] == true && !escapePressed) {  // если нажат Esc и не стоит пауза 
        escapePressed = true;
        togglePause();
        return;
    }

    if (keys["Escape"] == false) {  // Esc отпустили 
        escapePressed = false;
    }

    if (isPaused) {   // стоит пауза 
        return;
    }

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


    if ((keys["Digit1"] == true || keys["Digit3"] == true || keys["Digit4"] == true) && attackCooldown <= 0){

        let colvoMP = 0;
        let canAttack = false; // не можем атаковать если нет маны

        if (keys["Digit1"] == true) {
            number_strelu = 1;
            colvoMP = 5;
        } 
        else if (keys["Digit3"] == true) {
            number_strelu = 2;
            colvoMP = 10;
        } 
        else if (keys["Digit4"] == true) {
            number_strelu = 3;
            colvoMP = 30;
        }

        if (person.MP >= colvoMP){
            useMana(colvoMP);
            canAttack = true;
        }
        else {
            manaLowFlash = true;
            flashTimer = FLASH_DURATION;
        }

        if(canAttack){
            strely.push({
                x: person.x_pos + person.x_razmer_na_canvas,
                y: person.y_pos ,
                num: number_strelu
            });

            kolichestvo_strel += 1;
            attackCooldown = attackDelay; // сбрасываем задержку
        }
    }

}