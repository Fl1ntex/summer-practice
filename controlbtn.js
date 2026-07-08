// ==================== Cooldown UI с миганием при нехватке маны ====================

const circles = {
    1: document.getElementById('circle1'),
    2: document.getElementById('circle2'),
    3: document.getElementById('circle3'),
    4: document.getElementById('circle4')
};

const skillButtons = {
    1: document.getElementById('skill1'),
    2: document.getElementById('skill2'),
    3: document.getElementById('skill3'),
    4: document.getElementById('skill4')
};

const circumference = 270;

// Основное обновление кулдауна
function updateCooldownUI() {
    const data = [
        {id:1, cd: cooldown1, max: ATTACK_COOLDOWNS[1]},
        {id:3, cd: cooldown3, max: ATTACK_COOLDOWNS[2]},
        {id:4, cd: cooldown4, max: ATTACK_COOLDOWNS[3]}
    ];

    data.forEach(item => {
        const circle = circles[item.id];
        const btn = skillButtons[item.id];
        
        if (!circle) return;

        if (item.cd > 0) {
            const progress = item.cd / item.max;
            const offset = circumference * (1 - progress);
            circle.style.strokeDashoffset = offset;
        } else {
            circle.style.strokeDashoffset = circumference;
        }
    });

// Специальная логика для щита (кнопка 2) — обратное направление
    const shieldCircle = circles[2];
    if (shieldCircle) {
        let targetOffset = 0;   // по умолчанию пустая

        if (isUsedefence && person.MP > 0) {
            // Щит ВКЛЮЧЕН → шкала ЗАПОЛНЯЕТСЯ
            const manaSpent = max_mp - person.MP;
            const spentProgress = manaSpent / max_mp;
            targetOffset = 270 * (1 - spentProgress);   // заполнение
        } else {
            // Щит ВЫКЛЮЧЕН → шкала УХОДИТ ОБРАТНО
            const remainingProgress = person.MP / max_mp;
            targetOffset = 270 * remainingProgress;     // исчезает
        }

        shieldCircle.style.transition = 'stroke-dashoffset 0.18s linear';
        shieldCircle.style.strokeDashoffset = targetOffset;
    }
}

// Мигание красным при попытке нажатия без маны
function triggerSkillFlash(key) {
    const btn = skillButtons[key];
    if (!btn) return;

    // Включаем красное мигание
    btn.style.transition = 'none';
    btn.style.boxShadow = '0 0 0 6px rgba(255, 70, 70, 0.95)';
    btn.style.borderRadius = '20px';
    btn.style.borderColor = '#ff3333';

    // Убираем через короткое время
    setTimeout(() => {
        btn.style.transition = 'all 0.25s ease';
        btn.style.boxShadow = '';
        btn.style.borderColor = '';
    }, 160);
}

// Экспортируем функции (чтобы можно было вызывать из других файлов)
window.updateCooldownUI = updateCooldownUI;
window.triggerSkillFlash = triggerSkillFlash;