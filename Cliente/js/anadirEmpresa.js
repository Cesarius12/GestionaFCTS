import { createEmpresa } from '../services/empresaService.js';

document.addEventListener("DOMContentLoaded", () => {
    const usuarioConectado = JSON.parse(sessionStorage.getItem("usuarioConectado"));
    if (!usuarioConectado || usuarioConectado.tipo !== "tutor") {
        alert("No tienes permiso para acceder a esta página");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("user").textContent = usuarioConectado.nombre;
});

document.getElementById("empresaForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const empresaData = {
        nombreEmpresa: document.getElementById("nombre").value,
        razonSocial: document.getElementById("razonSocial").value,
        tipoEmpresa: document.getElementById("tipo").value,
        nifCif: document.getElementById("cif").value,   
        correoElectronico: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        direccion: document.getElementById("direccion").value,
        ciudad: document.getElementById("localidad").value,
        codigoPostal: document.getElementById("codigo_postal").value,
        pais: document.getElementById("pais").value,
        fechaConstitucion: document.getElementById("fechaC").value,
        sectorIndustria: document.getElementById("sector").value,
        numEmpleados: document.getElementById("emp").value,
        sitioWeb: document.getElementById("web").value,
        logoEmpresa: document.getElementById("logo").value,
        representanteLegal: document.getElementById("rep").value,
        estadoEmpresa: document.getElementById("estado").value,
        fechaAlta: document.getElementById("fechaA").value,
        notasAdicionales: document.getElementById("notas").value,
    };

    try {
        await createEmpresa(empresaData);
        alert('Empresa añadida correctamente');
        window.location.href = 'tutor.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Error al añadir empresa: ' + error.message);
    }
});

document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioConectado");
    window.location.href = "index.html";
}); 