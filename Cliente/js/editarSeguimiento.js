import { getSegId, updateSeguimiento } from "../services/seguimientoService.js";

document.addEventListener("DOMContentLoaded", async () => {
  const usuarioConectado = JSON.parse(
    sessionStorage.getItem("usuarioConectado")
  );
  if (!usuarioConectado) {
    alert("Debe iniciar sesión");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("user").textContent = usuarioConectado.nombre;

  const urlParams = new URLSearchParams(window.location.search);
  const segId = urlParams.get("id");

  if (segId) {
    try {
      const segData = await getSegId(segId);

      document.getElementById("idEmp").value = segData.id_empresa;
      document.getElementById("idCon").value = segData.id_contacto;
      document.getElementById("fecha").value = segData.fecha ? new Date(segData.fecha).toISOString().slice(0, 16) : null;
      document.getElementById("tipo").value = segData.tipo;
      document.getElementById("detalle").value = segData.detalle;
      document.getElementById("proxPas").value = segData.proximo_paso;
      document.getElementById("fechaProx").value = segData.fechaProx ? new Date(segData.fechaProx).toISOString().slice(0, 16) : null;
      document.getElementById("observaciones").value = segData.observaciones;
    } catch (error) {
      console.error("Error al cargar los datos de seguimiento:", error);
      alert("Error al cargar los datos de seguimiento");
    }
  }
});

document
  .getElementById("formSeg")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const seguimientoID = urlParams.get("id");

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
      await updateSeguimiento(segData, seguimientoID);
      alert("Seguimiento actualizado correctamente");
      window.location.href = "gestionarSeguimiento.html";
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar Seguimiento: " + error.message);
    }
  });

document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("usuarioConectado");
  window.location.href = "index.html";
});
