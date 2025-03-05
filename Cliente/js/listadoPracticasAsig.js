import { getPracticasAsig} from "../services/practicasService.js";

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
      window.location.href = "gestionarPracticas.html"; 
    });
  }
  document.getElementById(
    "user"
  ).textContent = `${usuarioConectado.nombre}`;
  await cargarAlumnos();
});

async function cargarAlumnos() {
  try {
    const alumnos = await getPracticasAsig();
    const container = document.getElementById("alumnosContainer");
    container.innerHTML = "";

    alumnos.forEach((alumno) => {
      const card = document.createElement("div");
      card.className = "alumno-card";
      card.innerHTML = `
                            <div class="card-actions">
                    <button onclick="editarPracticas(${
                      alumno.id_alumno
                    })" class="btn-editar">
                        Editar
                    </button>
                </div>
                <h3>${alumno.nombre_completo}</h3>
                <p>ID: ${alumno.id_alumno}</p>
                <p>Curso: ${alumno.grado_curso}</p>
                <p>Estado: ${alumno.estado}</p>
                <p>Email: ${alumno.correo_electronico || "No especificado"}</p>
                <p>Teléfono: ${alumno.telefono || "No especificado"}</p>
                <p>Notas: ${alumno.notas_academicas || "Sin calificación"}</p>
                <p>Empresa: ${alumno.Empresa || "No especificado"}</p>
            `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar alumnos:", error);
    alert("Error al cargar la lista de alumnos");
  }
}



window.editarPracticas = (alumnoId) => {
  window.location.href = `editarPracticasAsig.html?id=${alumnoId}`;
};

document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("usuarioConectado");
  window.location.href = "index.html";
});
