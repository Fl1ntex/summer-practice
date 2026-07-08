const { isValidElement } = require("react");

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
        if (!isUsedefence) return;
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

    if (keys['Space'] && !person.isJamp && !isUsedefence) {
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

    

const isKey1 = keys["Digit1"] === true;
const isKey3 = keys["Digit3"] === true;
const isKey4 = keys["Digit4"] === true;

if (!isUsedefence) {
    
    // --- ЛОГИКА ДЛЯ КНОПКИ 1 ---
    if (isKey1 && cooldown1 <= 0) {
        let colvoMP = 0;
        let canAttack = false;
        let number_strelu = 1;

        if (person.MP >= colvoMP) {
            useMana(colvoMP);
            canAttack = true;
        } else {
            manaLowFlash = true;
            triggerSkillFlash(1);
            flashTimer = FLASH_DURATION;
        }

        if (canAttack) {
            strely.push({
                x: person.x_pos + person.x_razmer_na_canvas,
                y: person.y_pos,
                num: number_strelu
            });
            kolichestvo_strel += 1;
            cooldown1 = ATTACK_COOLDOWNS[1]; // Ставим кулдаун только для кнопки 1
        }
    }

    // --- ЛОГИКА ДЛЯ КНОПКИ 3 ---
    if (isKey3 && cooldown3 <= 0) {
        let colvoMP = 10;
        let canAttack = false;
        let number_strelu = 2;

        if (person.MP >= colvoMP) {
            useMana(colvoMP);
            canAttack = true;
        } else {
            manaLowFlash = true;
            triggerSkillFlash(3);
            flashTimer = FLASH_DURATION;
        }

        if (canAttack) {
            strely.push({
                x: person.x_pos + person.x_razmer_na_canvas,
                y: person.y_pos,
                num: number_strelu
            });
            kolichestvo_strel += 1;
            cooldown3 = ATTACK_COOLDOWNS[2]; // Ставим кулдаун только для кнопки 3
        }
    }

    // --- ЛОГИКА ДЛЯ КНОПКИ 4 ---
    if (isKey4 && cooldown4 <= 0) {
        let colvoMP = 30;
        let canAttack = false;
        let number_strelu = 3;

        if (person.MP >= colvoMP) {
            useMana(colvoMP);
            canAttack = true;
        } else {
            manaLowFlash = true;
            triggerSkillFlash(4);
            flashTimer = FLASH_DURATION;
        }

        if (canAttack) {
            strely.push({
                x: person.x_pos + person.x_razmer_na_canvas,
                y: person.y_pos,
                num: number_strelu
            });
            kolichestvo_strel += 1;
            cooldown4 = ATTACK_COOLDOWNS[3]; // Ставим кулдаун только для кнопки 4
        }
    }
}

}