function person_AFK(){
    if (person.x_padding >= 240) {
        person.x_padding = 0;
    } else {
        person.x_padding += 120;
    }
}