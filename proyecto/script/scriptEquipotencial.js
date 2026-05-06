const info = document.getElementById("infoPotencial");
const num = document.getElementById("numCargas");

const canvas = document.getElementById('canvasPotencial');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let charges = []; // Array para almacenar las cargas
const K = 8987; // Constante simplificada para visualización

// Clase para crear objetos "Carga"
class Charge {
    constructor(x, y, q) {
        this.x = x;
        this.y = y;
        this.q = q; // Valor de la carga
    }
}

// Función para dibujar el mapa de calor (Potencial)
function drawPotential() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);

    for (let x = 0; x < canvas.width; x += 2) { // Saltamos píxeles para mejorar rendimiento
        for (let y = 0; y < canvas.height; y += 2) {
            let totalV = 0;

            charges.forEach(c => {
                let dx = x - c.x;
                let dy = y - c.y;
                let r = Math.sqrt(dx * dx + dy * dy) + 10; // +10 evita división por cero
                totalV += (K * c.q) / r;
            });

            // Colorear: Rojo para positivo, Azul para negativo
            let index = (x + y * canvas.width) * 4;
            const intensidad = Math.min(Math.abs(totalV) * 3, 255);

if (totalV > 0) {
    imageData.data[index] = intensidad;        // Rojo
    imageData.data[index + 1] = intensidad * 0.3; // Naranja suave
    imageData.data[index + 2] = 0;
} else {
    imageData.data[index] = 0;
    imageData.data[index + 1] = intensidad * 0.3;
    imageData.data[index + 2] = intensidad;    // Azul
}

imageData.data[index + 3] = 255; // Alpha
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

// Evento de clic para agregar cargas
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const q = e.shiftKey ? -50 : 50; // Negativa si presionas Shift
    charges.push(new Charge(x, y, q));
    update();
});

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPotential();

    charges.forEach(c => {
        ctx.fillStyle = c.q > 0 ? '#ff4d4d' : '#3b82f6';
        ctx.shadowBlur = 10;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });

    num.textContent = `Cargas: ${charges.length}`;
}

function clearCanvas() {
    charges = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let totalV = 0;

    charges.forEach(c => {
        let dx = x - c.x;
        let dy = y - c.y;
        let r = Math.sqrt(dx * dx + dy * dy) + 10;
        totalV += (K * c.q) / r;
    });

    info.textContent = `V = ${totalV.toFixed(2)}`;
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
        charges.pop();
        update();
    }
});