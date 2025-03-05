import { getSeguimiento} from "../services/seguimientoService.js";
//importamos la función getSeguimiento del archivo seguimientoService.js
document.addEventListener("DOMContentLoaded", async () => {
  const usuarioConectado = JSON.parse(
    sessionStorage.getItem("usuarioConectado")
  );
  if (
    !usuarioConectado ||
    (usuarioConectado.tipo !== "profesor" && usuarioConectado.tipo !== "tutor")
  ) {
    alert("No tienes permiso para acceder a esta página");
    window.location.href = "index.html";
    return;
  }
  const volverBtn = document.getElementById("btn-volver");

  if (usuarioConectado.tipo === "tutor") {
    volverBtn.style.display = "block"; 
    volverBtn.addEventListener("click", () => {
      window.location.href = "tutor.html"; 
    });
  }
  document.getElementById(
    "user"
  ).textContent = `${usuarioConectado.nombre}`;
  await cargarSeguimiento();
});

async function cargarSeguimiento() {
  try {
    //utilizo los mismos ids al tener css designado para ellos aun que ahora se trate de un seguimiento y no de un alumno
    const seguimiento = await getSeguimiento();
    const container = document.getElementById("alumnosContainer");
    container.innerHTML = "";
    //imprimo las tarjetas de seguimientos con los datos de cada seguimiento y dependiendo de la opcion o añado o edito
    seguimiento.forEach((seg) => {
      const card = document.createElement("div");
      card.className = "alumno-card";
      card.innerHTML = `
                            <div class="card-actions">
                    <button onclick="editarSeguimiento(${
                      seg.id_seguimiento
                    })" class="btn-editar">
                        Editar
                    </button>
                </div>
                <p>Id seguimiento: ${seg.id_seguimiento}</p>
                <p>Id empresa: ${seg.id_empresa}</p>
                <p>Id contacto: ${seg.id_contacto}</p>
                <p>Fecha de la cita: ${seg.fecha || "No especificado"}</p>
                <p>Tipo: ${seg.tipo || "No especificado"}</p>
                <p>Detalle: ${seg.detalle || "Sin calificación"}</p>
                <p>Siguiente cita: ${seg.fechaProx|| "No especificado"}</p>
            `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar alumnos:", error);
    alert("Error al cargar la lista de alumnos");
  }
}



window.editarSeguimiento = (seguimientoId) => {
  window.location.href = `editarSeguimiento.html?id=${seguimientoId}`;
};

document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("usuarioConectado");
  window.location.href = "index.html";
});
