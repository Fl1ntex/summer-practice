let orcs = [];
let orcImages = [];

// Для отслеживания фона
let lastBgOffset = 0;

const orcSpriteConfig = {
    1: { frameWidth: 110, frameHeight: 136, walkStartX: 550, attackStartX: 550, yWalk: 0, yAttack: 136, walkFrames: 6, attackFrames: 4, scale: 1.1, yOffset: 70 },
    2: { frameWidth: 172, frameHeight: 192, walkStartX: 1032, attackStartX: 976, yWalk: 0, yAttack: 192, walkFrames: 6, attackFrames: 3, scale: 0.8, yOffset: 60 },
    3: { frameWidth: 109, frameHeight: 126, walkStartX: 654, attackStartX: 646, yWalk: 0, yAttack: 126, walkFrames: 6, attackFrames: 3, scale: 1.25, yOffset: 60 }
};

function loadOrcImages() {
    for (let i = 1; i <= 3; i++) {
        let img = new Image();
        img.src = `img/enemy_lvl${i}.PNG`;
        orcImages.push(img);
    }
}

function createOrc() {
    const level = Math.floor(Math.random() * 3) + 1;
    const cfg = orcSpriteConfig[level];
    
    return {
        x: canvas.width + 150 + Math.random() * 280,
        y: 235 + cfg.yOffset,
        width: cfg.frameWidth * cfg.scale,
        height: cfg.frameHeight * cfg.scale,
        baseSpeed: 1.85 + level * 0.45,
        hp: 42 + level * 24,
        maxHp: 42 + level * 24,
        level: level,
        state: 'walk',
        frame: 0,
        animTick: 0,
        attackCooldown: 0,
        deathTimer: 0
    };
}

function spawnOrc() {
    if (orcs.length >= 3) return;
    if (Math.random() < 0.0065) {
        const count = Math.random() < 0.55 ? 1 : (Math.random() < 0.85 ? 2 : 3);
        for (let i = 0; i < count; i++) {
            if (orcs.length < 3) orcs.push(createOrc());
        }
    }
}

function getBackgroundDirection() {
    const diff = bgOffset - lastBgOffset;
    lastBgOffset = bgOffset;
    if (diff < -1) return "left";
    if (diff > 1) return "right";
    return "still";
}

function updateOrcs() {
    const bgDirection = getBackgroundDirection();

    for (let i = orcs.length - 1; i >= 0; i--) {
        const orc = orcs[i];
        const cfg = orcSpriteConfig[orc.level];

        if (isPaused) continue;
        orc.animTick++;

        let speed = orc.baseSpeed;

        if (bgDirection === "left") {
            speed += 25;
            orc.x -= speed;
        } 
        else if (bgDirection === "right") {
            speed *= 12;
            orc.x += speed;
        } 
        else {
            orc.x -= speed;
        }

        const dist = orc.x - person.x_pos;

        // Орки не атакуют, когда включён щит
        if (dist < 75 && dist > -25 && orc.attackCooldown <= 0 && orc.state !== 'death' && !isUsedefence) {
            orc.state = 'attack';
            orc.frame = 0;
            attackPlayerFromOrc(orc.level * 8);
            orc.attackCooldown = 40;
        }

        if (orc.attackCooldown > 0) orc.attackCooldown--;

        // смерть орка
        if (orc.hp <= 0) {
            orcs.splice(i, 1);
            continue;
        }

        // Анимация орка
        const frameRate = orc.state === 'attack' ? 4 : 6;
        if (orc.animTick % frameRate === 0) {
            if (orc.state === 'walk') {
                orc.frame = (orc.frame + 1) % cfg.walkFrames;
            } else if (orc.state === 'attack') {
                orc.frame = (orc.frame + 1) % cfg.attackFrames;
                if (orc.frame === 0) orc.state = 'walk';
            }
        }

        if (orc.x < -300 || orc.x > canvas.width + 400) orcs.splice(i, 1);
    }
}

function attackPlayerFromOrc(damage) {
    person.HP = Math.max(0, person.HP - damage);
}

function checkArrowHits() {
    for (let s = strely.length - 1; s >= 0; s--) {
        const a = strely[s];
        for (let o = orcs.length - 1; o >= 0; o--) {
            const orc = orcs[o];
            if (a.x + 48 > orc.x && a.x < orc.x + orc.width * 0.75 &&
                a.y + 38 > orc.y && a.y < orc.y + orc.height * 0.78) {
                orc.hp -= a.num * 20;
                strely.splice(s, 1);
                break;
            }
        }
    }
}

function drawOrcs() {
    for (let orc of orcs) {const img = orcImages[orc.level - 1];
        const cfg = orcSpriteConfig[orc.level];

        let sx, sy;
        if (orc.state === 'walk') {
            sx = cfg.walkStartX - (orc.frame * cfg.frameWidth);
            sy = cfg.yWalk;
        } else { 
            sx = cfg.attackStartX - (orc.frame * cfg.frameWidth);
            sy = cfg.yAttack;
        }

        const oldSmooth = context.imageSmoothingEnabled;
        context.imageSmoothingEnabled = false;
        context.drawImage(img, sx, sy, cfg.frameWidth, cfg.frameHeight, orc.x, orc.y, orc.width, orc.height);
        context.imageSmoothingEnabled = oldSmooth;

        // Полоска здоровья орка
        const bw = orc.width * 0.85;
        context.fillStyle = '#000000cc';
        context.fillRect(orc.x + 5, orc.y - 15, bw, 7);
        context.fillStyle = '#ff4444';
        context.fillRect(orc.x + 5, orc.y - 15, bw * (orc.hp / orc.maxHp), 7);
    }
}

loadOrcImages();

window.spawnOrc = spawnOrc;
window.updateOrcs = updateOrcs;
window.drawOrcs = drawOrcs;
window.checkArrowHits = checkArrowHits;