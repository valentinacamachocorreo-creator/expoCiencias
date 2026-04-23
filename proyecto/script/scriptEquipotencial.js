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

    for (let x = 0; x < canvas.width; x += 4) { // Saltamos píxeles para mejorar rendimiento
        for (let y = 0; y < canvas.height; y += 4) {
            let totalV = 0;

            charges.forEach(c => {
                let dx = x - c.x;
                let dy = y - c.y;
                let r = Math.sqrt(dx * dx + dy * dy) + 10; // +10 evita división por cero
                totalV += (K * c.q) / r;
            });

            // Colorear: Rojo para positivo, Azul para negativo
            let index = (x + y * canvas.width) * 4;
            imageData.data[index] = totalV > 0 ? Math.min(totalV * 2, 255) : 0; // R
            imageData.data[index + 1] = 0; // G
            imageData.data[index + 2] = totalV < 0 ? Math.min(Math.abs(totalV) * 2, 255) : 0; // B
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
    // Dibujar círculos donde están las cargas
    charges.forEach(c => {
        ctx.fillStyle = c.q > 0 ? 'white' : 'yellow';
        ctx.beginPath();
        ctx.arc(c.x, c.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

function clearCanvas() {
    charges = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}