import { getPracticas} from "../services/practicasService.js";

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
    const alumnos = await getPracticas();
    const container = document.getElementById("alumnosContainer");
    container.innerHTML = "";
    //Misma situacion que con las empresas, dependiendo del estado le asigno un id que posteriormente se vera como un color
    const estadoClase = {
      "NO REALIZA PRACTICAS": "no-practicas",
      "PENDIENTE ASIGNACION DE PRACTICAS":"pendiente",
      "ASIGNADO A EMPRESA":"asignada",
      "PENDIENTE CONVENIO":"pendiente",
      "REALIZADO CONVENIO":"asignada",
      "PENDIENTE RELACION DE ALUMNOS":"pendiente",
      "REALIZADO RELACION DE ALUMNOS":"asignada",
      "PENDIENTE PROGRAMA y HORARIO":"pendiente",
      "REALIZADO PROGRAMA y HORARIO":"asignada",
      "PENDIENTE EVALUCIÓN EMPRESA":"pendiente",
      "REALIZADA EVALUACION EMPRESA":"asignada",
      "PENDIENTE HOJAS DE FIRMAS":"pendiente",
      "REALIZADAS HOJAS DE FIRMAS":"asignada",
      "PENDIENTE ENVIO DOCUMENTACION":"pendiente",
      "FINALIZADAS":"finalizada",
    };

    alumnos.forEach((alumno) => {
      const card = document.createElement("div");
      //Añadir el id al crear la clase
      card.className = card.className = `alumno-card ${estadoClase[alumno.estadoEmp] || ""}`;
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
                <p>Estado: ${alumno.estadoEmp || "No especificado"}</p>
            `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar alumnos:", error);
    alert("Error al cargar la lista de alumnos");
  }
}



window.editarPracticas = (alumnoId) => {
  window.location.href = `editarPracticas.html?id=${alumnoId}`;
};

document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("usuarioConectado");
  window.location.href = "index.html";
});
