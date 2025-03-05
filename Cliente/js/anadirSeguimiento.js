import { createSeguimiento } from '../services/seguimientoService.js';

document.addEventListener("DOMContentLoaded", () => {
    const usuarioConectado = JSON.parse(sessionStorage.getItem("usuarioConectado"));
    if (!usuarioConectado) {
        alert("Debe iniciar sesión");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("user").textContent = usuarioConectado.nombre;
});

document.getElementById("seguimientoForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const segData = {
        id_empresa: document.getElementById("idEmp").value,
        id_contacto: document.getElementById("idCon").value,
        fecha: document.getElementById("fecha").value,
        tipo: document.getElementById("tipo").value,
        detalle: document.getElementById("detalle").value,
        proximo_paso: document.getElementById("proxPas").value,
        fechaProx: document.getElementById("fechaProx").value,
        observaciones: document.getElementById("observaciones").value,
    };

    try {
        await createSeguimiento(segData);
        alert('seguimiento añadido correctamente');
        window.location.href = 'gestionarSeguimiento.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Error al añadir seguimiento: ' + error.message);
    }
});

document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioConectado");
    window.location.href = "index.html";
}); 