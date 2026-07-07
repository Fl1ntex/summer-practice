function tick(){
    if (!gameRunning) {
        requestAnimationFrame(tick);
        return;
    }

    if (bgOffset <= -bg.width) {
        bgOffset = 0;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    fondraw();
    if (isUsedefence == false){     // если не включен щит обычный рисунок 
        context.drawImage(runner, person.x_padding, person.y_padding, 120, 130, person.x_pos, person.y_pos, 80, 87);
    }
    else { // если вклчюен щит рисуем дургую картинку
        if (person.x_padding >= 240) {
            person_def.x_padding = 0;
        } else {
            person_def.x_padding += 120;
        }
        context.drawImage(runner_defence,person_def.x_padding,person_def.y_padding,120,130,person.x_pos,person.y_pos,80,87);
    }
    
    if (person.tick_count > 5) {
        spriteRunner();
        person.tick_count = 0;
        if (!isPaused) {
            regenMana(0.3);
            regenHP(0.1); // регенерация маны и здоровья
        }
    }
    person_attack_strel();
    drawUI(); // отрисовка маны и хп

    if (attackCooldown > 0) {
        attackCooldown -= 1; // уменьшаем кд каждый кадр
    }

    for (let i = 0; i < strely.length; i++) {
        switch(strely[i].num){
            case 1:
                context.drawImage(strela1, 0, 0, 1024, 1024, strely[i].x, strely[i].y, 100, 100);
                break
            case 2:
                context.drawImage(strela2, 0, 0, 1024, 1024, strely[i].x, strely[i].y, 100, 100);
                break
            case 3:
                context.drawImage(strela3, 0, 0, 1024, 1024, strely[i].x, strely[i].y, 100, 100);
                break
        
        }
        
    }
    person.tick_count += 1;
    requestAnimationFrame(tick);
}