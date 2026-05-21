const canvas = document.getElementById('capCanvas');
const ctx = canvas.getContext('2d');

// Elementos de la interfaz
const distRange = document.getElementById('distRange');
const areaRange = document.getElementById('areaRange');
const dVal = document.getElementById("dVal");
const aVal = document.getElementById("aVal");

const cVal = document.getElementById('cVal');
const uVal = document.getElementById('uVal');

canvas.width = 700;
canvas.height = 450;

let offset = 0;

function draw() {

    offset += 0.5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Obtener valores de los sliders (SOLO UNA VEZ)
    const d = parseInt(distRange.value);
    const a = parseInt(areaRange.value);
    const voltaje = 9;

    // Mostrar valores en pantalla
    dVal.textContent = d;
    aVal.textContent = a;

    // Fórmulas físicas
    const capacitancia = (8.85 * (a / d)).toFixed(2);
    const energia = (0.5 * capacitancia * Math.pow(voltaje, 2)).toFixed(2);

    cVal.innerText = capacitancia;
    uVal.innerText = energia;

    // Glow dinámico
    canvas.style.boxShadow = `0 0 ${energia/20}px rgba(0, 212, 255, 0.6)`;

    // --- DIBUJO ---
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Placa superior
// placa superior (+)
ctx.save();
ctx.fillStyle = "#ef4444";
ctx.shadowBlur = 25;
ctx.shadowColor = "#ef4444";
ctx.fillRect(centerX - a / 2, centerY - d / 2, a, 12);
ctx.restore();

// placa inferior (-)
ctx.save();
ctx.fillStyle = "#3b82f6";
ctx.shadowBlur = 25;
ctx.shadowColor = "#3b82f6";
ctx.fillRect(centerX - a / 2, centerY + d / 2, a, 12);
ctx.restore();
    ctx.shadowBlur = 0;

    ctx.fillStyle = "white";
ctx.font = "18px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

ctx.fillText("+", centerX, centerY - d / 2 - 15);
ctx.fillText("−", centerX, centerY + d / 2 + 20);

    // Campo eléctrico
    ctx.strokeStyle = "rgba(0, 212, 255, 0.4)";
    ctx.lineWidth = 2;

    for (let x = centerX - a / 2 + 10; x < centerX + a / 2; x += 20) {

    let y1 = centerY - d / 2 + 10 + (offset % 20);
    let y2 = centerY + d / 2 - 5 + (offset % 20);

    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
}

for (let i = 0; i < 20; i++) {
    let x = centerX - a / 2 + Math.random() * a;
    let y = centerY - d / 2 + Math.random() * d;

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 212, 255, 0.3)";
    ctx.fill();
}

    requestAnimationFrame(draw);
}

draw();