const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// cargas fijas
let fixedCharges = [
    { x: 150, y: 250, q: 10 },
    { x: 550, y: 250, q: -10 }
];

let particles = [];
let balloon = { x: 350, y: 250, charge: 0 };

// crear partículas
for (let i = 0; i < 180; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5),
        vy: (Math.random() - 0.5),
        q: Math.random() > 0.5 ? 1 : -1
    });
}

// mover globo con mouse
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    balloon.x = e.clientX - rect.left;
    balloon.y = e.clientY - rect.top;
});

function update() {
    balloon.charge = 0;

    // calcular carga del globo
    fixedCharges.forEach(c => {
        let dx = c.x - balloon.x;
        let dy = c.y - balloon.y;
        let dist = Math.sqrt(dx * dx + dy * dy) + 1;

        if (dist < 200) {
            balloon.charge += c.q / dist;
        }
    });

    // interacción de partículas
    particles.forEach(p => {
        let dx = balloon.x - p.x;
        let dy = balloon.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy) + 1;

        let interaction = balloon.charge * p.q;
        let force = 1 / (dist * dist);

        if (interaction > 0) {
            // repulsión
            p.vx -= dx * force * 0.5;
            p.vy -= dy * force * 0.5;
        } else {
            // atracción
            p.vx += dx * force * 0.5;
            p.vy += dy * force * 0.5;

            // se pega al globo
            if (dist < 20) {
                p.vx = 0;
                p.vy = 0;
                p.x += (balloon.x - p.x) * 0.2;
                p.y += (balloon.y - p.y) * 0.2;
            }
        }

        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        // rebote
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // partículas
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.q > 0 ? "#f87171" : "#60a5fa";
        ctx.fill();
    });

    // cargas fijas
    fixedCharges.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = c.q > 0 ? "red" : "blue";
        ctx.fill();
    });

    // globo
    ctx.beginPath();
    ctx.arc(balloon.x, balloon.y, 25, 0, Math.PI * 2);
    ctx.fillStyle = balloon.charge > 0 ? "orange" : "purple";
    ctx.fill();

    // cuerda
    ctx.beginPath();
    ctx.moveTo(balloon.x, balloon.y + 25);
    ctx.lineTo(balloon.x, balloon.y + 70);
    ctx.strokeStyle = "white";
    ctx.stroke();

    // texto
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText("Carga del globo: " + balloon.charge.toFixed(2), 10, 20);
    ctx.fillText("Rojo = positivo | Azul = negativo", 10, 40);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();