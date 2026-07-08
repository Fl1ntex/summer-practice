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

    if (!isPaused && person.MP >= 5) isUsedefence = keys["Digit2"] == true;
    else if (person.MP == 0) isUsedefence = false;

    if (isUsedefence == false){     // если не включен щит обычный рисунок 
        context.drawImage(runner, person.x_padding, person.y_padding, 120, 130, person.x_pos, person.y_pos, 80, 87);
    }
    else { // если вклчюен щит рисуем дургую картинку
        afk_defecne();
        if (!isPaused) useMana(0.15)
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
    spawnOrc();
    updateOrcs();
    checkArrowHits();
    drawOrcs();
    drawUI(); // отрисовка маны и хп
    updateCooldownUI();

    document.getElementById('kill-count').textContent = countK; // орисовка cчетчика киллов

    if (!isPaused) {
        if (cooldown1 > 0) cooldown1--;
        if (cooldown3 > 0) cooldown3--;
        if (cooldown4 > 0) cooldown4--;
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
    // проверка окончания игры
    if (checkGameOver()) {
        requestAnimationFrame(tick);
        return;
    }
    person.tick_count += 1;
    requestAnimationFrame(tick);
}