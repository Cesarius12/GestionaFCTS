import {getPracticas} from "../services/practicasService.js";

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

  document.getElementById("user").textContent = usuarioConectado.nombre;

  const volverBtn = document.getElementById("btn-volver");
  if (volverBtn && usuarioConectado.tipo === "tutor") {
    volverBtn.style.display = "block"; 
    volverBtn.addEventListener("click", () => {
      window.location.href = "gestionarPracticas.html"; 
    });
  }

  await mostrarResponsabilidades();
});

async function mostrarResponsabilidades() {
  try {
    const alumnos = await getPracticas();
    const container = document.getElementById("responsabilidadesContainer");

    const tabla = document.createElement("table");
    tabla.className = "tabla-responsabilidades";
    //creo la tabla con sus indices
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Alumno</th>
        <th>Estado</th>
        <th>Responsable</th>
        <th>Descripción</th>
      </tr>
    `;
    tabla.appendChild(thead);

    const tbody = document.createElement("tbody");

    //Al no tener tabla de responsabilidades lo introduzco como literal
    const estadosInfo = {
      "NO REALIZA PRACTICAS": {
        responsable: "Tutor",
        descripcion: "El alumno no realizará prácticas"
      },
      "PENDIENTE ASIGNACION DE PRACTICAS": {
        responsable: "Tutor",
        descripcion: "Pendiente de asignar empresa al alumno"
      },
      "ASIGNADO A EMPRESA": {
        responsable: "Tutor",
        descripcion: "El alumno ha sido asignado a una empresa"
      },
      "PENDIENTE CONVENIO": {
        responsable: "Tutor",
        descripcion: "El convenio está pendiente de tramitación"
      },
      "REALIZADO CONVENIO": {
        responsable: "Tutor",
        descripcion: "El convenio ha sido tramitado correctamente"
      },
      "PENDIENTE RELACION DE ALUMNOS": {
        responsable: "Tutor",
        descripcion: "Pendiente de generar la relación de alumnos"
      },
      "REALIZADO RELACION DE ALUMNOS": {
        responsable: "Empresa",
        descripcion: "La relación de alumnos ha sido completada"
      },
      "PENDIENTE PROGRAMA y HORARIO": {
        responsable: "Tutor",
        descripcion: "Pendiente de establecer programa y horario"
      },
      "REALIZADO PROGRAMA y HORARIO": {
        responsable: "Empresa",
        descripcion: "Programa y horario establecidos"
      },
      "PENDIENTE EVALUCIÓN EMPRESA": {
        responsable: "Empresa",
        descripcion: "La empresa debe realizar la evaluación"
      },
      "REALIZADA EVALUACION EMPRESA": {
        responsable: "Empresa",
        descripcion: "La evaluación ha sido completada"
      },
      "PENDIENTE HOJAS DE FIRMAS": {
        responsable: "Alumno",
        descripcion: "Pendiente de entregar las hojas de firmas"
      },
      "REALIZADAS HOJAS DE FIRMAS": {
        responsable: "Alumno",
        descripcion: "Hojas de firmas entregadas"
      },
      "PENDIENTE ENVIO DOCUMENTACION": {
        responsable: "Secretaría",
        descripcion: "Pendiente de enviar documentación final"
      },
      "FINALIZADAS": {
        responsable: "Secretaría",
        descripcion: "Proceso completado"
      }
    };

    // Llenar la tabla con los datos de los alumnos
    alumnos.forEach(alumno => {
      const estado = alumno.estadoEmp || "Estado no definido";
      //creo un objeto con los estados
      const info = estadosInfo[estado] || {
        responsable: "No asignado",
        descripcion: "Sin información"
      };
      //accedo y muestro los datos
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${alumno.nombre_completo}</td>
        <td>${estado}</td>
        <td>${info.responsable}</td>
        <td>${info.descripcion}</td>
      `;
      tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);
    container.innerHTML = ''; // Limpiar el contenedor
    container.appendChild(tabla);

  } catch (error) {
    console.error("Error al cargar las responsabilidades:", error);
    alert("Error al cargar la información de responsabilidades");
  }
}

window.editarPracticas = (alumnoId) => {
  window.location.href = `editarPracticas.html?id=${alumnoId}`;
};

document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("usuarioConectado");
  window.location.href = "index.html";
});

// Función para determinar el responsable basado en el estado del alumno
function determinarResponsable(estadoAlumno) {
    const responsabilidades = {
        'PENDIENTE CONVENIO': 'Secretaría',
        'REALIZADO CONVENIO': 'Tutor',
        'PENDIENTE RELACION DE ALUMNOS': 'Profesor',
        'PENDIENTE PROGRAMA FORMATIVO': 'Coordinador',
        'PENDIENTE FIRMA EMPRESA': 'Empresa',
        'PENDIENTE FIRMA TUTOR': 'Tutor Centro',
        'EN PRACTICAS': 'Tutor',
        'FINALIZADO': 'Secretaría'
    };

    return responsabilidades[estadoAlumno] || 'No asignado';
}

// Función para mostrar el responsable en la interfaz
function mostrarResponsable(alumno) {
    const responsable = determinarResponsable(alumno.estado);
    return `
        <div class="responsabilidad-info">
            <p><strong>Estado:</strong> ${alumno.estado}</p>
            <p><strong>Responsable:</strong> ${responsable}</p>
        </div>
    `;
}

// Exportamos las funciones para usarlas en otros archivos
export { determinarResponsable, mostrarResponsable };
