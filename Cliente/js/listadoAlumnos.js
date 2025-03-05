import { getAlumnos, deleteAlumno } from "../services/alumnoService.js";

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
  //boton para navegar entre pestañas
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
  await cargarAlumnos();
  //añadimos los eventos a los selectores para que se actualice la lista de alumnos segun su curso y estado
  document.getElementById("filtroCurso").addEventListener("change", cargarAlumnos);
  document.getElementById("filtroEstado").addEventListener("change", cargarAlumnos);
});

async function cargarAlumnos() {
  try {
    // Obtener alumnos
    const alumnos = await getAlumnos();
    const container = document.getElementById("alumnosContainer");
    container.innerHTML = "";
    // Obtener los valores de los selectores
    const filtroCurso = document.getElementById("filtroCurso").value;
    const filtroEstado = document.getElementById("filtroEstado").value;

    // Obtener cursos y estados, de esta manera tenemos los datos automaticamente para los filtros sin necesidad de literales y en caso de que la tabla se añada algo se reflejaria
    const cursos = [...new Set(alumnos.map(a => a.grado_curso))];
    const estados = [...new Set(alumnos.map(a => a.Empresa))];

    // Llenar los selectores dinámicamente
    actualizarSelect("filtroCurso", cursos);
    actualizarSelect("filtroEstado", estados);

    // Filtrar alumnos
    const alumnosFiltrados = alumnos.filter(alumno => 
        (!filtroCurso || alumno.grado_curso === filtroCurso) &&
        (!filtroEstado || alumno.Empresa === filtroEstado)
    );
    //imprimo ya filtrado o con todos los alumnos
    //imprimo las tarjetas de alumnos con los datos de cada alumno y dependiendo de la opcion o añado o edito
    alumnosFiltrados.forEach((alumno) => {
      const card = document.createElement("div");
      card.className = "alumno-card";
      card.innerHTML = `
                            <div class="card-actions">
                    <button onclick="editarAlumno(${
                      alumno.id_alumno
                    })" class="btn-editar">
                        Editar
                    </button>
                    <button onclick="confirmarBorrado(${
                      alumno.id_alumno
                    })" class="btn-eliminar">
                        Eliminar
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
//funcion para actualizar los selectores si solo tiene la opción "Todos" nos da todos
function actualizarSelect(id, valores) {
  const select = document.getElementById(id);
  if (select.options.length === 1) { 
      valores.forEach(valor => {
          const option = document.createElement("option");
          option.value = valor;
          option.textContent = valor;
          select.appendChild(option);
      });
  }
}
//funcion para editar un alumno nos lleva a editarAlumno.html
window.editarAlumno = (alumnoId) => {
  window.location.href = `editarAlumno.html?id=${alumnoId}`;
};
//funcion para borrar un alumno nos pide confirmación y si aceptamos borra el alumno
window.confirmarBorrado = async (alumnoId) => {
  if (confirm("¿Está seguro de que desea eliminar este alumno?")) {
    try {
      await deleteAlumno(alumnoId);
      alert("Alumno eliminado correctamente");
      await cargarAlumnos();
    } catch (error) {
      console.error("Error al borrar alumno:", error);
      alert("Error al borrar alumno: " + error.message);
    }
  }
};

document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("usuarioConectado");
  window.location.href = "index.html";
});
