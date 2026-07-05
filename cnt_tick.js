function tick(){
    if (!gameRunning || isPaused) {
        requestAnimationFrame(tick);
        return;
    }

    if (person.tick_count > 5) {
        spriteRunner();
        person.tick_count = 0;
    }
    person.tick_count += 1;
    requestAnimationFrame(tick);
}