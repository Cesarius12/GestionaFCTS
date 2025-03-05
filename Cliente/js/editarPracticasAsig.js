import { getPracticasById,updatePracticas} from '../services/practicasService.js';

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
            const practicas = await getPracticasById(alumnoId);
            document.getElementById("nombre_completo").value=practicas.nombre_completo || '';
            document.getElementById("idAlum").value=practicas.idAlumno;
            document.getElementById("idEmpresa").value=practicas.idEmpresa;
            document.getElementById("estado").value=practicas.estadoEmp;
            document.getElementById("fechaI").value=practicas.fechaInicio ? practicas.fechaInicio.split('T')[0] : '';
            document.getElementById("fechaF").value=practicas.fechaFin ? practicas.fechaFin.split('T')[0] : '';
            document.getElementById("horario").value=practicas.horario || '';
            document.getElementById("numHoras").value=practicas.numHoras || '';
            document.getElementById("modalidad").value=practicas.modalidad || '';
            document.getElementById("idTutor").value=practicas.idTutor;
            document.getElementById("idContacto").value=practicas.idContacto;
        } catch (error) {
            console.error('Error al cargar los datos:', error);
            alert('Error al cargar los datos de las practicas');
        }
    }
});

document.getElementById("practicasFormAsig").addEventListener("submit", async function(event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const alumnoId = urlParams.get('id');
    
    const alumnoData = {
        idAlumno: document.getElementById("idAlum").value,
        idEmpresa: document.getElementById("idEmpresa").value || null,
        estadoEmp: document.getElementById("estado").value,
        fechaInicio: document.getElementById("fechaI").value || null,
        fechaFin: document.getElementById("fechaF").value || null,
        horario: document.getElementById("horario").value || null,
        numHoras: document.getElementById("numHoras").value || null,
        modalidad: document.getElementById("modalidad").value || null,
        idTutor: document.getElementById("idTutor").value,
        idContacto: document.getElementById("idContacto").value || null,
    };

    try {
        await updatePracticas(alumnoId, alumnoData);
        alert('Practicas actualizadas correctamente');
        window.location.href = 'listadoPracticasAsig.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar Practicas');
    }
});

document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioConectado");
    window.location.href = "index.html";
}); 