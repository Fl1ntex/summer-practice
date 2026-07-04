function jumpFunction(){
    person.jumpTick +=1;
        
        if (person.jumpTick <= 4) {
            person.y_pos -= step_jump;  
        } else if (person.jumpTick <= 8) {
            person.y_pos += step_jump;  
        } else {
            person.isJamp = false;
            person.y_pos = 350;
            person.jumpTick = 0;
        }
}