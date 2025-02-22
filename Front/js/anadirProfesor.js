import { createProf } from '../services/userService.js';

document.addEventListener("DOMContentLoaded", () => {
    const usuarioConectado = JSON.parse(sessionStorage.getItem("usuarioConectado"));
    
    if (!usuarioConectado || usuarioConectado.tipo !== "admin") {
        alert("No tienes permiso para acceder a esta página");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("user").textContent = `Usuario conectado: ${usuarioConectado.nombre}`;
});

document.getElementById('añadirProfesor').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const profesorData = {
            nombre: document.getElementById('nombre').value,
            dni: document.getElementById('dni').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value || null,
            direccion: document.getElementById('direccion').value || null,
            fechaNacimiento: document.getElementById('fechaNacimiento').value || null,
            genero: document.getElementById('genero').value || null,
            rol: document.getElementById('rol').value,
            departamento: document.getElementById('departamento').value,
            tipoContrato: document.getElementById('tipoContrato').value || null,
            fechaIngreso: document.getElementById('fechaIngreso').value || null,
            estado: document.getElementById('estado').value,
            notas_adicionales: document.getElementById('notas').value || null,
            password: document.getElementById('password').value
        };

        console.log('Datos a enviar:', profesorData);

        if (!validarCampos(profesorData)) return;

        const resultado = await createProf(profesorData);
        console.log('Respuesta del servidor:', resultado);

        if (resultado.message === "Profesor creado correctamente") {
            alert('Profesor añadido correctamente');
            window.location.href = 'listadoProfesores.html?modo=gestionar';
        } else {
            throw new Error('La creación no fue exitosa');
        }
    } catch (error) {
        console.error('Error al añadir profesor:', error);
        alert('Error al añadir profesor: ' + error.message);
    }
});

function validarCampos(profesorData) {
    if (!profesorData.nombre || !profesorData.dni || !profesorData.email || 
        !profesorData.rol || !profesorData.estado || !profesorData.password) {
        alert('Por favor, complete todos los campos obligatorios (marcados con *)');
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profesorData.email)) {
        alert('Por favor, ingrese un email válido');
        return false;
    }

    if (!/^[0-9]{8}[A-Z]$/.test(profesorData.dni)) {
        alert('Por favor, ingrese un DNI válido (8 números seguidos de una letra mayúscula)');
        return false;
    }

    return true;
}

window.volverAdmin = () => {
    window.location.href = 'admin.html';
};

document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioConectado");
    window.location.href = "index.html";
}); 