const canvas = document.getElementById('capCanvas');
const ctx = canvas.getContext('2d');

// Elementos de la interfaz
const distRange = document.getElementById('distRange');
const areaRange = document.getElementById('areaRange');
const cVal = document.getElementById('cVal');
const uVal = document.getElementById('uVal');

canvas.width = 600;
canvas.height = 400;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Obtener valores de los sliders
    const d = parseInt(distRange.value);     // Distancia
    const a = parseInt(areaRange.value);     // Área (ancho de la placa)
    const voltaje = 9;                       // Voltaje fijo de una batería de 9V

    // Fórmulas físicas simplificadas para el simulador
    // C = epsilon * A / d
    const capacitancia = (8.85 * (a / d)).toFixed(2);
    // U = 1/2 * C * V^2
    const energia = (0.5 * capacitancia * Math.pow(voltaje, 2)).toFixed(2);

    // Actualizar textos en pantalla
    cVal.innerText = capacitancia;
    uVal.innerText = energia;

    // --- DIBUJO ---
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Placa Superior (+)
    ctx.fillStyle = "#ef4444";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ef4444";
    ctx.fillRect(centerX - a / 2, centerY - d / 2, a, 10);

    // Placa Inferior (-)
    ctx.fillStyle = "#3b82f6";
    ctx.shadowColor = "#3b82f6";
    ctx.fillRect(centerX - a / 2, centerY + d / 2, a, 10);

    ctx.shadowBlur = 0; // Quitar brillo para las líneas

    // Dibujar líneas del Campo Eléctrico (E)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 2;
    // Dibujamos flechas entre las placas
    for (let x = centerX - a / 2 + 10; x < centerX + a / 2; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, centerY - d / 2 + 10);
        ctx.lineTo(x, centerY + d / 2);
        ctx.stroke();

        // Pequeña punta de flecha hacia abajo
        ctx.beginPath();
        ctx.moveTo(x - 3, centerY + d / 2 - 5);
        ctx.lineTo(x, centerY + d / 2);
        ctx.lineTo(x + 3, centerY + d / 2 - 5);
        ctx.stroke();
    }

    requestAnimationFrame(draw);
}

draw();