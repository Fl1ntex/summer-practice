// отрисовка маны и хп
function drawUI() {
    const padding = 20;
    const barHeight = 15;
    const barWidth = 200;
    const gap = 6;

    // Тёмный фон полоски
    context.fillStyle = '#333';
    context.fillRect(padding, padding, barWidth, barHeight);

    // Рамка вокруг полоски HP
    context.strokeStyle = '#000000';
    context.lineWidth = 3;
    context.strokeRect(padding, padding, barWidth, barHeight);

    // Цветная часть HP
    const hpPercent = person.HP / max_hp;
    context.fillStyle = hpPercent > 0.3 ? '#ff4444' : '#ff0000';
    context.fillRect(padding, padding, barWidth * hpPercent, barHeight);

    // Текст HP
    context.fillStyle = '#ffffff';
    context.font = 'bold 13px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif';
    context.textAlign = 'left';
    context.fillText(`HP: ${Math.floor(person.HP)}`, padding + 5, padding + barHeight - 2);

    const manaY = padding + barHeight + gap;

    // Тёмный фон полоски маны
    context.fillStyle = '#333';
    context.fillRect(padding, manaY, barWidth, barHeight);

    // Рамка вокруг полоски маны
    context.strokeStyle = '#000000';
    context.lineWidth = 3;
    context.strokeRect(padding, manaY, barWidth, barHeight);

    // Цветная часть маны
    const manaPercent = person.MP / max_mp;
    if (manaLowFlash && flashTimer > 0) {
        context.fillStyle = '#790000'; // если маны не хватает
        flashTimer--;
        if (flashTimer <= 0) manaLowFlash = false;
    } else {
        context.fillStyle = '#0004ff';
    }
    context.fillRect(padding, manaY, barWidth * manaPercent, barHeight);

    // Текст маны
    context.fillStyle = '#ffffff';
    context.font = 'bold 13px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif';
    context.textAlign = 'left';
    context.fillText(`Mana: ${Math.floor(person.MP)}`, padding + 5, manaY + barHeight - 2);
}


// использование маны и ее регенерация
function useMana(colvo_mani) {
  person.MP = Math.max(0, person.MP - colvo_mani);
}

function regenMana(colvo_mani) {
  if (person.MP < max_mp) {
    person.MP = Math.min(max_mp, person.MP + colvo_mani);
  }
}

// трата хп и его регенерация
function useHP(colvo_hp) {
  person.HP = Math.max(0, person.HP - colvo_hp);
}

function regenHP(colvo_hp) {
  if (person.HP < max_hp) {
    person.HP = Math.min(max_hp, person.HP + colvo_hp);
  }
}