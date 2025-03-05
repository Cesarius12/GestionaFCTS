import { getContactoById, updateContacto } from '../services/contactoService.js';

document.addEventListener("DOMContentLoaded", async () => {
    const usuarioConectado = JSON.parse(sessionStorage.getItem("usuarioConectado"));
    if (!usuarioConectado || usuarioConectado.tipo !== "tutor") {
        alert("No tienes permiso para acceder a esta página");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("user").textContent = usuarioConectado.nombre;

    const urlParams = new URLSearchParams(window.location.search);
    const contactoId = urlParams.get('id');

if (contactoId) {
    try {
        const contacto = await getContactoById(contactoId);
        document.getElementById("nombre").value = contacto.nombreCompleto || null;
        document.getElementById("cargo").value = contacto.cargoPuesto || null;
        document.getElementById("dep").value = contacto.departamento || null;
        document.getElementById("email").value = contacto.correoElectronico || null;
        document.getElementById("tel").value = contacto.telefono || null;
        document.getElementById("direccion").value = contacto.direccionOficina || null;
        document.getElementById("horario").value = contacto.horarioTrabajo || null;
        document.getElementById("rel").value = contacto.relacion || null;
        document.getElementById("fecha").value = contacto.fechaIngreso ? contacto.fechaIngreso.split('T')[0] : null;
        document.getElementById("foto").value = contacto.fotoPerfil || null; 
        document.getElementById("obv").value = contacto.observaciones || null;
        document.getElementById("estado").value = contacto.estado || null;
        document.getElementById("notas").value = contacto.notasAdicionales || null;
        document.getElementById("nivel").value = contacto.nivelAcceso || null;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('Error al cargar los datos de la persona de contacto');
    }
}
});


document.getElementById("contactoForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const contactoId = urlParams.get('id');
    
    const contactoData = {
        nombreCompleto: document.getElementById("nombre").value || null,
        cargoPuesto: document.getElementById("cargo").value || null,
        departamento: document.getElementById("dep").value || null,
        correoElectronico: document.getElementById("email").value || null,   
        telefono: document.getElementById("tel").value || null,
        direccionOficina: document.getElementById("direccion").value || null,
        horarioTrabajo: document.getElementById("horario").value || null,
        relacion: document.getElementById("rel").value || null,
        fechaIngreso: document.getElementById("fecha").value || null,
        fotoPerfil: document.getElementById("foto").value || null,
        observaciones: document.getElementById("obv").value || null,
        estado: document.getElementById("estado").value || null,
        notasAdicionales: document.getElementById("notas").value || null,
        nivelAcceso: document.getElementById("nivel").value || null,
    };

    try {
        await updateContacto(contactoData, contactoId);
        alert('contacto actualizada correctamente');
        window.location.href = 'tutor.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar contacto: ' + error.message);
    }
});

document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioConectado");
    window.location.href = "index.html";
}); 