const canvas = document.getElementById('canvasAcelerador');
const ctx = canvas.getContext('2d');
const voltInput = document.getElementById('volts');
const vDisplay = document.getElementById('vDisplay');
const energyDisplay = document.getElementById('energy');
const statusDisplay = document.getElementById('status');

canvas.width = 700;
canvas.height = 300;

// Configuración de la partícula
let particle = {
    x: 50,
    y: 150,
    vx: 0,
    radius: 8,
    active: false
};

// Actualizar texto del voltaje
voltInput.addEventListener('input', () => {
    vDisplay.innerText = voltInput.value;
});

// Función para disparar
function launch() {
    particle.x = 40;   // Empezamos un poco antes de la placa roja
    particle.vx = 2;   // Le damos un pequeño empujón inicial (velocidad de inyección)
    particle.active = true;
    statusDisplay.innerText = "¡Disparado!";
}

document.getElementById('btnLaunch').addEventListener('click', launch);

document.getElementById('btnReset').addEventListener('click', () => {
    particle.active = false;
    particle.x = 50;
    particle.vx = 0;
    statusDisplay.innerText = "Listo";
    energyDisplay.innerText = "0";
});

function update() {
    // 1. Limpiar el fondo con un poco de rastro (estela)
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Dibujar Placas
    ctx.fillStyle = "#ff4444"; // Placa Positiva (+)
    ctx.fillRect(70, 80, 15, 140);

    ctx.fillStyle = "#4444ff"; // Placa Negativa (-)
    ctx.fillRect(250, 80, 15, 140);

    // 3. Lógica de Física del Movimiento
    if (particle.active) {
        let v = parseInt(voltInput.value);

        // ZONA DE ACELERACIÓN: Entre placa roja (70) y azul (250)
        if (particle.x >= 70 && particle.x <= 250) {
            // Aceleramos la partícula proporcional al voltaje
            // Dividimos por 100 para que no sea tan brusco
            particle.vx += (v / 150);
            statusDisplay.innerText = "Acelerando...";
            statusDisplay.style.color = "#ffcc00";
        } else if (particle.x > 250) {
            // ZONA DE VELOCIDAD CONSTANTE: Ya pasó las placas
            statusDisplay.innerText = "Velocidad Máxima Alcanzada";
            statusDisplay.style.color = "#00ff88";
            energyDisplay.innerText = (v * 1.6).toFixed(0); // Simulación de eV
        }

        // Mover la partícula según su velocidad actual
        particle.x += particle.vx;

        // Si sale de la pantalla, reiniciar posición para que no se pierda
        if (particle.x > canvas.width + 50) {
            particle.active = false;
            statusDisplay.innerText = "Impacto en Detector";
        }
    }

    // 4. Dibujar el Protón con brillo
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#00d4ff";
    ctx.fill();
    // Brillo alrededor de la partícula
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00d4ff";
    ctx.stroke();
    ctx.shadowBlur = 0;

    requestAnimationFrame(update);
}

update();