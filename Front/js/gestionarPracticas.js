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

document.getElementById("btnGestionar").onclick = () => {
  window.location.href = "listadoPracticas.html";
};
document.getElementById("btnGestionarPracticas").onclick = () => {
  window.location.href = "listadoPracticasAsig.html";
};

document.getElementById("logoutButton").onclick = () => {
  sessionStorage.removeItem("usuarioConectado");
  window.location.href = "index.html";
};
});