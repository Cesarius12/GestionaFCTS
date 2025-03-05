import { createAlumno } from '../services/alumnoService.js';
//Para crear un alumno, importamos la función createAlumno del archivo alumnoService.js
document.addEventListener("DOMContentLoaded", () => {
    const usuarioConectado = JSON.parse(sessionStorage.getItem("usuarioConectado"));
    if (!usuarioConectado) {
        alert("Debe iniciar sesión");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("user").textContent = usuarioConectado.nombre;
});
//del formulario alumno cogemos los datos y los guardamos en la variable alumnoData
//Luego llamamos a la función createAlumno con los datos del alumno
//esto ya accede al backend y crea el alumno
//Si todo va bien, se muestra un mensaje de éxito y se redirige a la página de listado de alumnos 
//Todos los anadir*.js son iguales, solo cambia el nombre de la entidad y sus datos
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
//boton de logout
document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioConectado");
    window.location.href = "index.html";
}); 