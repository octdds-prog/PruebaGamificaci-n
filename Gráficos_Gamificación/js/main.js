// Elementos del DOM
const codigoInput = document.getElementById('codigoAcceso');
const btnAceptarCodigo = document.getElementById('btnAceptarCodigo');
const codigoContainer = document.getElementById('codigoContainer');

const registroContainer = document.getElementById('registroContainer');
const nombreInput = document.getElementById('nombreJugador');
const btnComenzar = document.getElementById('btnComenzar');

// --- VALIDAR CÓDIGO ---
btnAceptarCodigo.addEventListener('click', () => {
    const codigo = codigoInput.value.trim();
    const codigoValido = "1234"; // Cambia este valor según tu código de acceso

    if (codigo === codigoValido) {
        // Ocultar el bloque de código
        codigoContainer.style.display = "none";
        // Mostrar el bloque de registro
        registroContainer.style.display = "flex";
    } else {
        // Alert con salto de línea
        alert("Código incorrecto.\nEnvía un correo al profe para que te indique el correcto.");
    }
});

// --- PASAR A LA PÁGINA DE AVATAR ---
btnComenzar.addEventListener('click', () => {
    const nombre = nombreInput.value.trim();

    if (nombre === "") {
        alert("Por favor, introduce tu nombre antes de continuar.");
    } else {
        // Guardar el nombre en localStorage
        localStorage.setItem('nombreJugador', nombre);
        // Redirigir a la página del avatar
        window.location.href = "avatar.html";
    }
});
