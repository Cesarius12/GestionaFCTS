import { getAlumnoById, updateAlumno } from '../services/alumnoService.js';
//importamos las funciones getAlumnoById y updateAlumno del archivo alumnoService.js
document.addEventListener("DOMContentLoaded", async () => {
    const usuarioConectado = JSON.parse(sessionStorage.getItem("usuarioConectado"));
    if (!usuarioConectado) {
        alert("Debe iniciar sesión");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("user").textContent = usuarioConectado.nombre;
//recogemos el id del alumno de la url
//si existe, llamamos a la función getAlumnoById para obtener los datos del alumno
    const urlParams = new URLSearchParams(window.location.search);
    const alumnoId = urlParams.get('id');
    
    if (alumnoId) {
        try {
            const alumno = await getAlumnoById(alumnoId);
            //rellenamos los campos del formulario con los datos del alumno para que haya persistencia de datos
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
            document.getElementById("idEmpresa").value = alumno.Empresa;
        } catch (error) {
            console.error('Error al cargar los datos:', error);
            alert('Error al cargar los datos del alumno');
        }
    }
});

document.getElementById("alumnoForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    //recogemos el id del alumno de la url
    //recogemos los datos del formulario y los guardamos en la variable alumnoData
    const urlParams = new URLSearchParams(window.location.search);
    const alumnoId = urlParams.get('id');
    //llamamos a la función updateAlumno con el id del alumno y los datos del formulario
    //Si todo va bien, se muestra un mensaje de éxito y se redirige a la página de listado de alumnos
    //todos los editar son iguales menos editarPracticas.js nos vemos alli
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