import { getAlumnoById, updateAlumno } from '../services/alumnoService.js';

document.addEventListener("DOMContentLoaded", async () => {
    const usuarioConectado = JSON.parse(sessionStorage.getItem("usuarioConectado"));
    if (!usuarioConectado) {
        alert("Debe iniciar sesión");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("user").textContent = usuarioConectado.nombre;

    const urlParams = new URLSearchParams(window.location.search);
    const alumnoId = urlParams.get('id');
    
    if (alumnoId) {
        try {
            const alumno = await getAlumnoById(alumnoId);

            document.getElementById("nombre_completo").value = alumno.nombre_completo;
            document.getElementById("fecha_nacimiento").value = alumno.fecha_nacimiento ? alumno.fecha_nacimiento.split('T')[0] : '';
            document.getElementById("genero").value = alumno.genero;
            document.getElementById("correo_electronico").value = alumno.correo_electronico;
            document.getElementById("telefono").value = alumno.telefono;
            document.getElementById("direccion").value = alumno.direccion;
            document.getElementById("id_curso").value = alumno.id_curso;
            document.getElementById("grado_curso").value = alumno.grado_curso;
            document.getElementById("estado").value = alumno.estado;
            document.getElementById("notas_academicas").value = alumno.notas_academicas;
            document.getElementById("observaciones").value = alumno.observaciones;
            document.getElementById("idEmpresa").value = alumno.EmpresaS;
        } catch (error) {
            console.error('Error al cargar los datos:', error);
            alert('Error al cargar los datos del alumno');
        }
    }
});

document.getElementById("alumnoForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const alumnoId = urlParams.get('id');
    
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
        notas_academicas: document.getElementById("notas_academicas").value,
        observaciones: document.getElementById("observaciones").value,
        Empresa: document.getElementById("idEmpresa").value,
    };

    try {
        await updateAlumno(alumnoId, alumnoData);
        alert('Alumno actualizado correctamente');
        window.location.href = 'listadoAlumnos.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar alumno');
    }
});

document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioConectado");
    window.location.href = "index.html";
}); 