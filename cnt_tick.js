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
    context.drawImage(runner, person.x_padding, person.y_padding, 120, 130, person.x_pos, person.y_pos, 80, 87);

    if (person.tick_count > 5) {
        spriteRunner();
        person.tick_count = 0;
        person_attack_strel();
    }

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