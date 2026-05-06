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

function draw() {

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
    ctx.fillStyle = "#ef4444";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ef4444";
    ctx.fillRect(centerX - a / 2, centerY - d / 2, a, 10);

    // Placa inferior
    ctx.fillStyle = "#3b82f6";
    ctx.shadowColor = "#3b82f6";
    ctx.fillRect(centerX - a / 2, centerY + d / 2, a, 10);

    ctx.shadowBlur = 0;

    // Campo eléctrico
    ctx.strokeStyle = "rgba(0, 212, 255, 0.4)";
    ctx.lineWidth = 2;

    for (let x = centerX - a / 2 + 10; x < centerX + a / 2; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, centerY - d / 2 + 10);
        ctx.lineTo(x, centerY + d / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - 3, centerY + d / 2 - 5);
        ctx.lineTo(x, centerY + d / 2);
        ctx.lineTo(x + 3, centerY + d / 2 - 5);
        ctx.stroke();
    }

    requestAnimationFrame(draw);
}

draw();