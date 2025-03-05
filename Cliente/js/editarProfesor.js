import { getProfId, updateProf } from "../services/userService.js";

document.addEventListener("DOMContentLoaded", () => {
    const usuarioConectado = JSON.parse(sessionStorage.getItem("usuarioConectado"));
    if (!usuarioConectado) {
        alert("Debe iniciar sesión");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("user").textContent = usuarioConectado.nombre;

    const urlParams = new URLSearchParams(window.location.search);
    const profesorId = urlParams.get('id');
    
    console.log("ID del profesor:", profesorId);

    if (profesorId) {
        fetch(`http://localhost:3000/profesores/${profesorId}`)
            .then(response => response.json())
            .then(data => {
                // Obtener el primer elemento del array
                const profesor = data[0];
                console.log("Datos del profesor:", profesor);
                
                // Rellenar el formulario con los datos del profesor
                document.getElementById("nombre").value = profesor.nombre;
                document.getElementById("dni").value = profesor.dni;
                document.getElementById("email").value = profesor.email;
                document.getElementById("telefono").value = profesor.telefono;
                document.getElementById("departamento").value = profesor.departamento;
                document.getElementById("rol").value = profesor.rol;
                document.getElementById("estado").value = profesor.estado;
                document.getElementById("tipo_contrato").value = profesor.tipo_contrato;
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error);
                alert('Error al cargar los datos del profesor');
            });
    }
});

document.getElementById("profesorForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const profesorId = urlParams.get('id');
    
    const profesorData = {
        nombre: document.getElementById("nombre").value,
        dni: document.getElementById("dni").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        departamento: document.getElementById("departamento").value,
        rol: document.getElementById("rol").value,
        estado: document.getElementById("estado").value,
        tipo_contrato: document.getElementById("tipo_contrato").value
    };

    fetch(`http://localhost:3000/profesores/${profesorId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profesorData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Profesor actualizado correctamente');
        window.location.href = 'admin.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al actualizar profesor');
    });
});

document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioConectado");
    window.location.href = "index.html";
});
