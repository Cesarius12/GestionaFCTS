document.addEventListener("DOMContentLoaded", () => {
    const usuarioConectado = JSON.parse(sessionStorage.getItem("usuarioConectado"));
    if (!usuarioConectado) {
        alert("Debe iniciar sesión");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("user").textContent = usuarioConectado.nombre;


    const urlParams = new URLSearchParams(window.location.search);
    const modo = urlParams.get('modo');
    console.log("Modo actual:", modo);


    cargarProfesores(modo);
});
//al no saber hacerlo bien todavia es la unica pagina rara ya que paso los datos de una manera diferente 1er dia con node
function cargarProfesores(modo) {
    console.log("Cargando profesores en modo:", modo);
    
    fetch('http://localhost:3000/profesores')
        .then(response => response.json())
        .then(profesores => {
            const container = document.getElementById('profesoresContainer');
            container.innerHTML = '';

            profesores.forEach(profesor => {
                const card = document.createElement('div');
                card.className = 'profesor-card';
                
                let botonesHTML = '';
                console.log("Evaluando botones para modo:", modo);
                
                if (modo === 'gestionar') {
                    botonesHTML = `
                        <button onclick="window.editarProfesor(${profesor.id_profesor})" class="btn-editar">
                            Editar
                        </button>
                    `;
                } else if (modo === 'eliminar') {
                    botonesHTML = `
                        <button onclick="window.confirmarBorrado(${profesor.id_profesor})" class="btn-eliminar">
                            Eliminar
                        </button>
                    `;
                }

                card.innerHTML = `
                    <h3>${profesor.nombre}</h3>
                    <p><strong>DNI:</strong> ${profesor.dni}</p>
                    <p><strong>Email:</strong> ${profesor.email}</p>
                    <p><strong>Teléfono:</strong> ${profesor.telefono}</p>
                    <div class="card-actions">
                        ${botonesHTML}
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cargar la lista de profesores');
        });
}

window.editarProfesor = (profesorId) => {
    window.location.href = `editarProfesor.html?id=${profesorId}`;
};

window.confirmarBorrado = (profesorId) => {
    if (confirm('¿Está seguro de que desea eliminar este profesor?')) {
        fetch(`http://localhost:3000/profesores/${profesorId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('Profesor eliminado correctamente');
            const urlParams = new URLSearchParams(window.location.search);
            const modo = urlParams.get('modo');
            cargarProfesores(modo);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al borrar profesor');
        });
    }
};

document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("usuarioConectado");
    window.location.href = "index.html";
}); 