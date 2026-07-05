function fondraw(){
    for (let i = 0; i < 6; i++) {
        context.drawImage(bg, bgOffset + i * bg.width, 0);
    }
}

