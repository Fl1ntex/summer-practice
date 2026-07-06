function key_on_A(centerX, worldX){
    if (person.x_pos > centerX) {
            person.x_pos -= step_shag;
        } else if (bgOffset < 0) {
            bgOffset += step_shag;
            person.x_pos = centerX; 
        } else if (worldX > 0) {
            person.x_pos -= step_shag;
        }
        person.y_padding = 650; //523 для бега с щитом
}