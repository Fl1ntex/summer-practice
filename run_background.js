function fondraw(){
    for (let i = 0; i < 9; i++) {
        context.drawImage(bg, bgOffset + i * bg.width, 0);
    }
}

