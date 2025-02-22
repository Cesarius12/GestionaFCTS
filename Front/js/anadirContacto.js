import { createContacto } from '../services/contactoService.js';

document.addEventListener("DOMContentLoaded", () => {
    const usuarioConectado = JSON.parse(sessionStorage.getItem("usuarioConectado"));
    if (!usuarioConectado || usuarioConectado.tipo !== "tutor") {
        alert("No tienes permiso para acceder a esta página");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("user").textContent = usuarioConectado.nombre;
});

document.getElementById("contactoForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
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
        await createContacto(contactoData);
        alert('Contacto añadida correctamente');
        window.location.href = 'tutor.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Error al añadir Contacto: ' + error.message);
    }
});

document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioConectado");
    window.location.href = "index.html";
}); 