let spinning = false;

function spinWheel() {
    if (spinning) return;
    spinning = true;

    const canvas = document.getElementById("fortuneWheel");
    const ctx = canvas.getContext("2d");

    let angle = 0;
    const spin = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.arc(0, 0, 100, 0, Math.PI * 2);
        ctx.fillStyle = "#b388eb";
        ctx.fill();
        ctx.restore();

        angle += 0.1;
        if (angle > Math.PI * 10) {
            clearInterval(spin);
            spinning = false;
        }
    }, 16);
}
