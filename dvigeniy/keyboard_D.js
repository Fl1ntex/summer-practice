function key_on_D(centerX, worldX){
    if (isUsedefence) return;
    if (person.x_pos < centerX) {
        person.x_pos += step_shag;
    } else if (-bgOffset + canvas.width < mapLength) {
        bgOffset -= step_shag;
        person.x_pos = centerX;
    } else if (worldX + 80 < mapLength) {
        person.x_pos += step_shag;
    }
    person.y_padding = 910; // 784 для бега с щитом
}
    