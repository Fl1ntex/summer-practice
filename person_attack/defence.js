function afk_defecne(){
    person_def.defenceTick++;
    if(person_def.defenceTick > 5){
        if (person_def.x_padding >= 240) {
            person_def.x_padding = 0;
        } 
        else {
            person_def.x_padding += 120;
        }
        person_def.defenceTick = 0;
    }
    context.drawImage(runner_defence,person_def.x_padding,person_def.y_padding,120,130,person.x_pos,person.y_pos,80,87);
}