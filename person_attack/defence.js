function afk_defecne(){
    if (person_def.x_padding >= 240) {
        person_def.x_padding = 0;
    } 
    else {
        person_def.x_padding += 120;
    }
    context.drawImage(runner_defence,person_def.x_padding,person_def.y_padding,120,130,person.x_pos,person.y_pos,80,87);
}