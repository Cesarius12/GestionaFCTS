import { createAlumno } from '..services/alumnoService.js';

document.addEventListener("DOMContentLoaded", () => {
    const usuarioConectado = JSON.parse(sessionStorage.getItem("usuarioConectado"));
    if (!usuarioConectado) {
        alert("Debe iniciar sesión");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("user").textContent = usuarioConectado.nombre;
});

document.getElementById("alumnoForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const alumnoData = {
        nombre_completo: document.getElementById("nombre_completo").value,
        fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
        genero: document.getElementById("genero").value,
        correo_electronico: document.getElementById("correo_electronico").value,
        telefono: document.getElementById("telefono").value,
        direccion: document.getElementById("direccion").value,
        id_curso: document.getElementById("id_curso").value,
        grado_curso: document.getElementById("grado_curso").value,
        estado: document.getElementById("estado").value,
        notas_academicas: document.getElementById("notas_academicas").value || null,
        observaciones: document.getElementById("observaciones").value || null,
        Empresa: document.getElementById("idEmpresa").value,
    };

    try {
        await createAlumno(alumnoData);
        alert('Alumno añadido correctamente');
        window.location.href = 'listadoAlumnos.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Error al añadir alumno: ' + error.message);
    }
});

document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioConectado");
    window.location.href = "index.html";
}); 