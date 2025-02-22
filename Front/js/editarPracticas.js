import {
  getPracticasById,
  updatePracticas,
} from "../services/practicasService.js";

document.addEventListener("DOMContentLoaded", async () => {
  const usuarioConectado = JSON.parse(
    sessionStorage.getItem("usuarioConectado")
  );
  if (!usuarioConectado) {
    alert("Debe iniciar sesión");
    window.location.href = "index.html";
    return;
  }

  const estadoSelect = document.getElementById("estado");
  const seccionConvenio = document.getElementById("seccionConvenio");
  const seccionRelacion = document.getElementById("seccionRelacion");
  const seccionPrograma = document.getElementById("seccionPrograma");

  function ocultarSecciones() {
    seccionConvenio.classList.add("oculto");
    seccionRelacion.classList.add("oculto");
    seccionPrograma.classList.add("oculto");
  }

  estadoSelect.addEventListener("change", function () {
    ocultarSecciones();
    const estado = estadoSelect.value;

    if (estado === "PENDIENTE CONVENIO") {
      seccionConvenio.classList.remove("oculto");
    } else if (estado === "PENDIENTE RELACION DE ALUMNOS") {
      seccionRelacion.classList.remove("oculto");
    } else if (estado === "PENDIENTE PROGRAMA y HORARIO") {
      seccionPrograma.classList.remove("oculto");
    }
  });

  document.getElementById("user").textContent = usuarioConectado.nombre;

  const urlParams = new URLSearchParams(window.location.search);
  const alumnoId = urlParams.get("id");

  if (alumnoId) {
    try {
      const practicas = await getPracticasById(alumnoId);
      document.getElementById("nombre_completo").value =
        practicas.nombre_completo;
      document.getElementById("idAlum").value = practicas.idAlumno;
      document.getElementById("idEmpresa").value = practicas.idEmpresa;
      document.getElementById("estado").value = practicas.estadoEmp;
      document.getElementById("idTutor").value = practicas.idTutor;
      document.getElementById("idContacto").value = practicas.idContacto;
      document.getElementById("nombreEmp").value = practicas.nombreEmp || null;
      document.getElementById("cifEmp").value = practicas.cifEmp || null;
      document.getElementById("direccionEmp").value = practicas.direccionEmp || null;
      document.getElementById("tipoEmp").value = practicas.tipoEmp || null;
      document.getElementById("nombreRep").value = practicas.nombreRep || null;
      document.getElementById("dniRep").value = practicas.dniRep || null;
      document.getElementById("cargoRep").value = practicas.cargoRep || null;
      document.getElementById("persCon").value = practicas.persCon || null;
      document.getElementById("emailCon").value = practicas.emailCon || null;
      document.getElementById("telfCon").value = practicas.telfCon || null;
      document.getElementById("nombreTut").value = practicas.nombreTut || null;
      document.getElementById("dniTut").value = practicas.dniTut || null;
      document.getElementById("emailTut").value = practicas.emailTut || null;
      document.getElementById("dirPrac").value = practicas.dirPrac || null;
      document.getElementById("diaFirma").value = practicas.diaDeFirma ? practicas.diaDeFirma.split('T')[0] : "";
      document.getElementById("firmaConv").value = practicas.firmaConv || null;
      document.getElementById("firmaRel").value = practicas.firmaRel || null;
      document.getElementById("firmaSem").value = practicas.firmaSem || null;
      document.getElementById("fechaI").value = practicas.fechaInicio ? practicas.fechaInicio.split('T')[0]: "";
      document.getElementById("fechaF").value = practicas.fechaFin ? practicas.fechaFin.split('T')[0] : "";
      document.getElementById("horario").value = practicas.horario || null;
      document.getElementById("numHoras").value = practicas.numHoras || null;
      document.getElementById("modalidad").value = practicas.modalidad || null;
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      alert("Error al cargar los datos del alumno");
    }
  }
});

document
  .getElementById("formPracticas")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const alumnoId = urlParams.get("id");

    const alumnoData = {
      idAlumno: document.getElementById("idAlum").value,
      idEmpresa: document.getElementById("idEmpresa").value || null,
      estadoEmp: document.getElementById("estado").value,
      nombreEmp: document.getElementById("nombreEmp").value || null,
      cifEmp: document.getElementById("cifEmp").value || null,
      direccionEmp: document.getElementById("direccionEmp").value || null,
      tipoEmp: document.getElementById("tipoEmp").value || null,
      nombreRep: document.getElementById("nombreRep").value || null,
      dniRep: document.getElementById("dniRep").value || null,
      cargoRep: document.getElementById("cargoRep").value || null,
      persCon: document.getElementById("persCon").value || null,
      emailCon: document.getElementById("emailCon").value || null,
      telfCon: document.getElementById("telfCon").value || null,
      nombreTut: document.getElementById("nombreTut").value || null,
      dniTut: document.getElementById("dniTut").value || null,
      emailTut: document.getElementById("emailTut").value || null,
      dirPrac: document.getElementById("dirPrac").value || null,
      diaDeFirma: document.getElementById("diaFirma").value || null,
      firmaConv: document.getElementById("firmaConv").value || null,
      firmaRel: document.getElementById("firmaRel").value || null,
      firmaSem: document.getElementById("firmaSem").value || null,
      fechaInicio: document.getElementById("fechaI").value || null,
      fechaFin: document.getElementById("fechaF").value || null,
      horario: document.getElementById("horario").value || null,
      numHoras: document.getElementById("numHoras").value || null,
      modalidad: document.getElementById("modalidad").value || null,
      idTutor: document.getElementById("idTutor").value,
      idContacto: document.getElementById("idContacto").value || null,
    };

    try {
      await updatePracticas(alumnoId, alumnoData);
      alert("Practicas actualizadas correctamente");
      window.location.href = "listadoPracticas.html";
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar Practicas");
    }
  });

document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("usuarioConectado");
  window.location.href = "index.html";
});
