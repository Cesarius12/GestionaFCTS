import { getEmpresaById, updateEmpresa } from '../services/empresaService.js';

document.addEventListener("DOMContentLoaded", async () => {
    const usuarioConectado = JSON.parse(sessionStorage.getItem("usuarioConectado"));
    if (!usuarioConectado || usuarioConectado.tipo !== "tutor") {
        alert("No tienes permiso para acceder a esta página");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("user").textContent = usuarioConectado.nombre;

    const urlParams = new URLSearchParams(window.location.search);
    const empresaId = urlParams.get('id');
    
    if (empresaId) {
        try {
            const empresa = await getEmpresaById(empresaId);
            
            document.getElementById("nombre").value = empresa.nombreEmpresa || '';
            document.getElementById("razonSocial").value = empresa.razonSocial || '';
            document.getElementById("tipo").value = empresa.tipoEmpresa || '';
            document.getElementById("cif").value = empresa.nifCif || '';
            document.getElementById("email").value = empresa.correoElectronico || '';
            document.getElementById("telefono").value = empresa.telefono || '';
            document.getElementById("direccion").value = empresa.direccion || '';
            document.getElementById("localidad").value = empresa.ciudad || '';
            document.getElementById("codigo_postal").value = empresa.codigoPostal || '';
            document.getElementById("pais").value = empresa.pais || '';
            document.getElementById("fechaC").value = empresa.fechaConstitucion ? empresa.fechaConstitucion.split('T')[0] : ''
            document.getElementById("sector").value = empresa.sectorIndustria || '';
            document.getElementById("emp").value = empresa.numEmpleados || '';
            document.getElementById("web").value = empresa.sitioWeb || '';
            document.getElementById("logo").value = empresa.logoEmpresa || '';
            document.getElementById("rep").value = empresa.representanteLegal || '';
            document.getElementById("estado").value = empresa.estadoEmpresa ;
            document.getElementById("fechaA").value = empresa.fechaAlta ? empresa.fechaAlta.split('T')[0]: '';
            document.getElementById("notas").value = empresa.notasAdicionales || '';            
        } catch (error) {
            console.error('Error al cargar los datos:', error);
            alert('Error al cargar los datos de la empresa');
        }
    }
});

document.getElementById("empresaForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const empresaId = urlParams.get('id');
    
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
        await updateEmpresa(empresaData, empresaId);
        alert('Empresa actualizada correctamente');
        window.location.href = 'tutor.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar empresa: ' + error.message);
    }
});

document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioConectado");
    window.location.href = "index.html";
}); 