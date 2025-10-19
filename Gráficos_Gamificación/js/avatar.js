// ====== Elementos del DOM ======
const inputFile = document.getElementById('avatarFile');
const preview = document.getElementById('previewAvatar');
const btnGuardar = document.getElementById('btnGuardarAvatar');

// ====== Mostrar vista previa al seleccionar archivo ======
inputFile.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(e){
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
});

// ====== Guardar avatar y pasar a la primera prueba ======
btnGuardar.addEventListener('click', () => {
    if(inputFile.files.length === 0){
        alert('Tienes que subir una imagen para tu avatar.');
    } else {
        const avatarSrc = preview.src;
        localStorage.setItem('avatarJugador', avatarSrc); // Guardar en localStorage

        // Bloquear retroceso antes de redirigir
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };

        // Redirigir a la primera prueba
        window.location.href = 'Pruebas/Prueba1.html';
    }
});
