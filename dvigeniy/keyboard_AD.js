function key_on_AD(centerX, worldX){
    person.y_padding = 0;
    person_AFK();  // в любом случае проигрываем аницмаю моргания 
    
    if (keys["Space"] && person.isJamp == false){ // если нажат пробел прыгаем 
        person.isJamp = true;
        person.jumpTick = 0;
    }
    
    if (person.isJamp) {
        jumpFunction();
    }
    
    fondraw();
    context.drawImage(runner, person.x_padding, person.y_padding, 120, 130, person.x_pos, person.y_pos, person.x_razmer_na_canvas, person.y_razmer_na_canvas);
    return;
}
    