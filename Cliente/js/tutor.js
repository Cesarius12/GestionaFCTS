document.addEventListener("DOMContentLoaded", () => {
  const usuarioConectado = JSON.parse(
    sessionStorage.getItem("usuarioConectado")
  );
 if (
    !usuarioConectado ||
    usuarioConectado.tipo !== "tutor"
  ) {
    alert("No tienes permiso para acceder a esta página");
    window.location.href = "index.html";
    return;
  }

  document.getElementById(
    "user"
  ).textContent = `Tutor: ${usuarioConectado.nombre}`;

  // Configurar botones de Empresas
  document.getElementById("btnGestionarEmpresa").onclick = () => {
    window.location.href = "listadoEmpresas.html?modo=gestionar";
  };

  document.getElementById("btnAnadirEmpresa").onclick = () => {
    window.location.href = "anadirEmpresa.html";
  };

  document.getElementById("btnBorrarEmpresa").onclick = () => {
    window.location.href = "listadoEmpresas.html?modo=eliminar";
  };

  // Configurar botones de Personas de Contacto
  document.getElementById("btnGestionarContacto").onclick = () => {
    window.location.href = "listadoContactos.html?modo=gestionar";
  };

  document.getElementById("btnAnadirContacto").onclick = () => {
    window.location.href = "anadirContacto.html";
  };

  document.getElementById("btnBorrarContacto").onclick = () => {
    window.location.href = "listadoContactos.html?modo=eliminar";
  };

  //Botones para las practicas y alumnos
  document.getElementById("btnGestionar").onclick = () => {
    window.location.href = "listadoAlumnos.html?modo=gestionar";
  };
  document.getElementById("btnGestionarPracticas").onclick = () => {
    window.location.href = "gestionarPracticas.html";
  };
  document.getElementById("seguimiento").onclick = () => {
    window.location.href = "gestionarSeguimiento.html";
  };

  // Configurar botón de logout
  document.getElementById("logoutButton").onclick = () => {
    sessionStorage.removeItem("usuarioConectado");
    window.location.href = "index.html";
  };
});