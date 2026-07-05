function person_attack_strel(){
    for (let i = strely.length - 1; i >= 0; i--) {
        if (!isPaused){
            strely[i].x += speed_strel;         // двигаем вправо
        }
        if (strely[i].x > canvas.width) {  // если за экраном удаляем
            strely.splice(i, 1);  // удаление эелемента из массива
        }
    }
}