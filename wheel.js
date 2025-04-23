const canvas = document.getElementById('fortuneWheel');
const ctx = canvas.getContext('2d');

const sectors = [
    "Деф навсегда",
    "Деф на неделю",
    "Деф на 1 раз",
    "Скидка 25% на все",
    "Скидка 25% на обучение",
    "Обучение ручному осинту",
    "1 бесплатный сват",
    "Подписка на ГБ на неделю",
    "Ничего",
    "Ничего",
    "Ничего"
];

const colors = [
    "#b388eb", "#d3a8ff", "#a68fc2", "#c5a3ff", "#f0caff",
    "#e2b3ff", "#d3a8ff", "#b388eb", "#333", "#444", "#555"
];

let angle = 0;
let spinning = false;

function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    const anglePerSector = (2 * Math.PI) / sectors.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < sectors.length; i++) {
        const startAngle = angle + i * anglePerSector;
        const endAngle = startAngle + anglePerSector;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + anglePerSector / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#121212";
        ctx.font = "13px Arial";
        ctx.fillText(sectors[i], radius - 10, 5);
        ctx.restore();
    }

    ctx.fillStyle = "#b388eb";
    ctx.beginPath();
    ctx.moveTo(centerX - 10, 5);
    ctx.lineTo(centerX + 10, 5);
    ctx.lineTo(centerX, 25);
    ctx.fill();
}

function spinWheel() {
    if (spinning) return;
    spinning = true;

    let velocity = Math.random() * 0.3 + 0.3;
    const friction = 0.991;

    function animate() {
        angle += velocity;
        velocity *= friction;

        if (velocity < 0.002) {
            spinning = false;

            const normalized = (2 * Math.PI - angle % (2 * Math.PI)) % (2 * Math.PI);
            const sectorAngle = (2 * Math.PI) / sectors.length;
            const index = Math.floor(normalized / sectorAngle);

            setTimeout(() => {
                alert("Вы выиграли: " + sectors[index]);
                launchConfetti();
            }, 300);

            return;
        }

        drawWheel();
        requestAnimationFrame(animate);
    }

    animate();
}

function launchConfetti() {
    const duration = 2000;
    const end = Date.now() + duration;
    const colors = ['#b388eb', '#d3a8ff', '#f0caff', '#a68fc2', '#ffffff'];

    (function frame() {
        const timeLeft = end - Date.now();
        for (let i = 0; i < 5; i++) {
            createParticle();
        }

        if (timeLeft > 0) {
            requestAnimationFrame(frame);
        }
    })();

    function createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("confetti");
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

drawWheel();
