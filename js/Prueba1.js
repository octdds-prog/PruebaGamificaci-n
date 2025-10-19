// ====== Mostrar nombre y avatar del jugador ======
document.addEventListener('DOMContentLoaded', () => {
    const nombreSpan = document.getElementById('nombreJugador');
    const avatarImg = document.getElementById('avatarJugador');

    const nombreJugador = localStorage.getItem('nombreJugador');
    const avatarJugador = localStorage.getItem('avatarJugador');

    nombreSpan.textContent = nombreJugador || 'Jugador desconocido';
    if (avatarJugador) {
        avatarImg.src = avatarJugador;
        avatarImg.style.display = 'inline-block';
    } else {
        avatarImg.style.display = 'none';
    }
});

// ====== Código de la Prueba 1 ======
const ejeX = document.getElementById('ejeX');
const ejeY = document.getElementById('ejeY');
const canvasPrueba = document.getElementById('canvasPrueba');
const btnComprobar = document.getElementById('btnComprobar');
const imagenEjes = document.getElementById('imagenEjes');
const mensajeCorrecto = document.getElementById('mensajeCorrecto');
const reloj = document.getElementById('reloj');

let posicionesCorrectas = { ejeX: false, ejeY: false };

// ==== Cronómetro ====
let tiempo = 0;
const timer = setInterval(() => {
    tiempo++;
    reloj.textContent = `Tiempo: ${tiempo} s`;
}, 1000);

// ==== Drag & Drop ====
[ejeX, ejeY].forEach(pieza => {
    pieza.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
    });
});

canvasPrueba.addEventListener('dragover', (e) => {
    e.preventDefault();
});

canvasPrueba.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const pieza = document.getElementById(id);

    const rect = canvasPrueba.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    pieza.style.position = 'absolute';
    pieza.style.left = (x - pieza.offsetWidth / 2) + 'px';
    pieza.style.top = (y - pieza.offsetHeight / 2) + 'px';

    canvasPrueba.appendChild(pieza);

    // Validar posición aproximada según el área del gráfico
    if (id === 'ejeX') {
        // Eje X -> parte inferior horizontal
        posicionesCorrectas.ejeX = y > 330 && y < 380;
    } else if (id === 'ejeY') {
        // Eje Y -> parte izquierda vertical
        posicionesCorrectas.ejeY = x > 20 && x < 90;
    }

    console.log('Posiciones correctas:', posicionesCorrectas);
});

// ==== Comprobación ====
btnComprobar.addEventListener('click', () => {
    if (posicionesCorrectas.ejeX && posicionesCorrectas.ejeY) {
        // Detener reloj
        clearInterval(timer);

        // Mostrar mensaje de éxito
        mensajeCorrecto.style.display = 'block';
        mensajeCorrecto.innerHTML = '¡CORRECTO!';
        mensajeCorrecto.style.color = '#2ECC71';

        // Efecto: bordes del gráfico en verde
        canvasPrueba.style.borderColor = '#2ECC71';

        // Si lo logra en menos de 10 segundos
        if (tiempo <= 10) {
            const insignia = document.createElement('div');
            insignia.classList.add('insignia');
            insignia.innerHTML = 'Has ganado la insignia al más rápido 🏅';
            mensajeCorrecto.appendChild(insignia);
        }

        // Guardar progreso
        localStorage.setItem('prueba1Completada', 'true');
    } else {
        alert('Aún no has colocado correctamente ambos ejes.');
    }
});
