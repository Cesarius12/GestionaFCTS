function inicializarAdmin() {
    // Verificar sesión
    const usuarioConectado = sessionStorage.getItem("usuarioConectado");
    console.log('Verificando usuario:', usuarioConectado);
    
    if (!usuarioConectado) {
        alert("No has iniciado sesión");
        window.location.href = "index.html";
        return;
    }

    const usuario = JSON.parse(usuarioConectado);
    if (usuario.tipo !== "admin") {
        alert("No tienes permiso para acceder a esta página");
        window.location.href = "index.html";
        return;
    }

    
    document.getElementById("user").textContent = `Usuario: ${usuario.nombre}`;
    document.getElementById("logoutButton").style.display = "block";

    
    configurarBotones();
}


function configurarBotones() {
    // Gestionar Profesores
    document.getElementById("btnGestionar").addEventListener('click', function() {
        window.location.href = 'listadoProfesores.html?modo=gestionar';
    });

    // Añadir Profesor
    document.getElementById("btnAnadir").addEventListener('click', function() {
        window.location.href = 'anadirProfesor.html';
    });

    // Borrar Profesores
    document.getElementById("btnBorrar").addEventListener('click', function() {
        window.location.href = 'listadoProfesores.html?modo=eliminar';
    });

    // Logout
    document.getElementById("logoutButton").addEventListener('click', function() {
        sessionStorage.removeItem("usuarioConectado");
        window.location.href = 'index.html';
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarAdmin);
} else {
    inicializarAdmin();
}

// Función para cargar y mostrar profesores
async function cargarProfesores() {
    try {
        const users = await getUsers();
        const userList = document.getElementById('userList');
        userList.innerHTML = '';

        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user-card';
            userDiv.innerHTML = `
                <div class="user-info">
                    <h3>${user.nombre}</h3>
                    <p>DNI: ${user.dni || 'No especificado'}</p>
                    <p>Email: ${user.email || 'No especificado'}</p>
                    <p>Rol: ${user.rol || 'No especificado'}</p>
                    <p>Estado: ${user.estado || 'No especificado'}</p>
                </div>
                <div class="user-actions">
                    <button onclick="editarProfesores(${user.id})">Editar</button>
                </div>
            `;
            userList.appendChild(userDiv);
        });
    } catch (error) {
        console.error('Error al cargar Profesores:', error);
        alert('Error al cargar la lista de Profesores');
    }
}

window.editarProfesores = (profId) => {
    window.location.href = `editarProfesor.html?id=${profId}`;
};

window.guardarCambios = async (userId) => {
    try {
        const formData = new FormData();

        const userData = {
            nombre: document.getElementById('editNombre').value,
            dni: document.getElementById('editId').value,
            email: document.getElementById('editEmail').value,
            telefono: document.getElementById('editTelefono').value || null,
            direccion: document.getElementById('editDireccion').value || null,
            fechaNacimiento: document.getElementById('editFechaNacimiento').value || null,
            genero: document.getElementById('editGenero').value || null,
            rol: document.getElementById('editRol').value,
            departamento: document.getElementById('editDepartamento').value || null,
            tipoContrato: document.getElementById('editTipoContrato').value || null,
            fechaIngreso: document.getElementById('editFechaIngreso').value || null,
            estado: document.getElementById('editEstado').value,
            notas: document.getElementById('editNotas').value || null,
            password: document.getElementById('editPassword').value || undefined
        };

        if (!userData.nombre || !userData.dni || !userData.email || !userData.rol || !userData.estado) {
            alert('Por favor, complete todos los campos obligatorios (marcados con *)');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            alert('Por favor, ingrese un email válido');
            return;
        }

        if (!/^[0-9]{8}[A-Z]$/.test(userData.dni)) {
            alert('Por favor, ingrese un DNI válido (8 números seguidos de una letra mayúscula)');
            return;
        }

        if (userData.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(userData.password)) {
            alert('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales');
            return;
        }

        const fotoInput = document.getElementById('editFoto');
        if (fotoInput.files.length > 0) {
            formData.append('foto', fotoInput.files[0]);
        }

        Object.keys(userData).forEach(key => 
            userData[key] === null && delete userData[key]
        );

        await updateUser(userId, userData);
        await cargarUsuarios();
        alert('Profesor actualizado correctamente');
        cancelarEdicion();
    } catch (error) {
        console.error('Error al actualizar:', error);
        alert('Error al actualizar profesor');
    }
};


window.cancelarEdicion = () => {
    const editForm = document.querySelector('.edit-form');
    if (editForm) editForm.remove();
};

function gestionarProfesores() {
    window.location.href = 'listadoProfesores.html?modo=gestionar';
}

function anadirProfesor() {
    window.location.href = 'anadirProfesor.html';
}

function borrarProfesores() {
    window.location.href = 'listadoProfesores.html?modo=borrar';
}

window.gestionarProfesores = gestionarProfesores;
window.anadirProfesor = anadirProfesor;
window.borrarProfesores = borrarProfesores;
