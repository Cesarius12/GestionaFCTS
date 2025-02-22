import { getEmpresa, deleteEmpresa } from "../services/empresaService.js";
document.addEventListener("DOMContentLoaded", () => {
  const usuarioConectado = JSON.parse(
    sessionStorage.getItem("usuarioConectado")
  );
  if (!usuarioConectado || usuarioConectado.tipo !== "tutor") {
    alert("No tienes permiso para acceder a esta página");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("user").textContent = `Tutor: ${usuarioConectado.nombre}`;

  const urlParams = new URLSearchParams(window.location.search);
  const modo = urlParams.get("modo");
  console.log("Modo actual:", modo);

  cargarEmpresas(modo);
});

async function cargarEmpresas(modo) {
  console.log("Cargando empresas en modo:", modo);
  try {
    const empresas = await getEmpresa();
    const container = document.getElementById("empresasContainer");
    container.innerHTML = "";

    const estadoEmp = {
      "Sin contactar": "sin-contactar",
      "Contactado": "Contactado",
      "Admite alumnos": "admiteAlumno",
      "No admite alumnos": "noAdmiteAlumno",
    };

    empresas.forEach((empresa) => {
      const card = document.createElement("div");
      card.className = `empresas-card ${estadoEmp[empresa.estadoEmpresa] || ""}`;

      let botonesHTML = "";
      console.log("Evaluando botones para modo:", modo);

      if (modo === "gestionar") {
        botonesHTML = `
                        <button onclick="editarEmpresa(${empresa.idEmpresa})" class="btn-editar">
                            Editar
                        </button>
                    `;
      } else if (modo === "eliminar") {
        botonesHTML = `
                        <button onclick="confirmarBorrado(${empresa.idEmpresa})" class="btn-eliminar">
                            Eliminar
                        </button>
                    `;
      }

      card.innerHTML = `
                    <h3>${empresa.nombreEmpresa}</h3>
                    <p><strong>Razon social:</strong> ${empresa.razonSocial}</p>
                    <p><strong>Email:</strong> ${empresa.correoElectronico}</p>
                    <p><strong>Teléfono:</strong> ${empresa.telefono}</p>
                    <p><strong>Representante:</strong> ${empresa.representanteLegal}</p>
                    <p><strong>Estado:</strong> ${empresa.estadoEmpresa}</p>
                    <div class="card-actions">
                        ${botonesHTML}
                    </div>
                `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar empresas:", error);
  }
}
window.editarEmpresa = (empresaId) => {
  window.location.href = `editarEmpresa.html?id=${empresaId}`;
};

window.confirmarBorrado = async (empresaId) => {
  if (confirm("¿Está seguro de que desea eliminar esta empresa?")) {
    try {
      await deleteEmpresa(empresaId);
      alert("Empresa eliminado correctamente");
      await cargarEmpresas();
    } catch (error) {
      console.error("Error al borrar Empresa:", error);
    }
  }
};
document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("usuarioConectado");
  window.location.href = "index.html";
});
