import { getContacto, deleteContacto } from "../services/contactoService.js";
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

  cargarContactos(modo);
});

async function cargarContactos(modo) {
  console.log("Cargando contactos en modo:", modo);
  try {
    const contactos = await getContacto();
    const container = document.getElementById("contactosContainer");
    container.innerHTML = "";

    contactos.forEach((contacto) => {
      const card = document.createElement("div");
      card.className = "contactos-card";

      let botonesHTML = "";
      console.log("Evaluando botones para modo:", modo);

      if (modo === "gestionar") {
        botonesHTML = `
                        <button onclick="editarContacto(${contacto.idContacto})" class="btn-editar">
                            Editar
                        </button>
                    `;
      } else if (modo === "eliminar") {
        botonesHTML = `
                        <button onclick="confirmarBorrado(${contacto.idContacto})" class="btn-eliminar">
                            Eliminar
                        </button>
                    `;
      }

      card.innerHTML = `
                    <h3>${contacto.nombreCompleto}</h3>
                    <p><strong>Cargo:</strong> ${contacto.cargoPuesto}</p>
                    <p><strong>Email:</strong> ${contacto.correoElectronico}</p>
                    <p><strong>Teléfono:</strong> ${contacto.telefono}</p>
                    <p><strong>Relacion con la empresa:</strong> ${contacto.relacion}</p>
                    <div class="card-actions">
                        ${botonesHTML}
                    </div>
                `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar contactos:", error);
  }
}
window.editarContacto = (contactoId) => {
  window.location.href = `editarContacto.html?id=${contactoId}`;
};

window.confirmarBorrado = async (contactoId) => {
  if (confirm("¿Está seguro de que desea eliminar este Contacto?")) {
    try {
      await deleteContacto(contactoId);
      alert("Contacto eliminado correctamente");
      await cargarContactos();
    } catch (error) {
      console.error("Error al borrar Contacto:", error);
    }
  }
};
document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("usuarioConectado");
  window.location.href = "index.html";
});
