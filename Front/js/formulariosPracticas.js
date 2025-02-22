document.addEventListener("DOMContentLoaded", function () {
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
});
