import { getUsers } from '../services/userService.js';

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const usuarios = await getUsers();
        const usuario = usuarios.find(u => u.username === username && u.password === password);
        
        if (usuario) {
            sessionStorage.setItem('usuarioConectado', JSON.stringify(usuario));
            alert('Bienvenido ' + usuario.nombre);
            
            if (usuario.tipo === 'admin') {
                window.location.href = 'admin.html';
            } else if (usuario.tipo === 'profesor' || usuario.tipo === 'tutor') {
                if (usuario.tipo === 'tutor') {
                    window.location.href = 'tutor.html';
                } else {
                    window.location.href = 'listadoAlumnos.html';
                }
            } else {
                alert('Tipo de usuario no válido');
            }
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error en el login:', error);
        alert('Error al intentar iniciar sesión');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const usuarioConectado = JSON.parse(sessionStorage.getItem('usuarioConectado'));
    if (usuarioConectado) {
        document.getElementById('user').textContent = `Usuario conectado: ${usuarioConectado.nombre}`;
        document.getElementById('logoutButton').style.display = 'block';
    }
});

document.getElementById('logoutButton').addEventListener('click', () => {
    sessionStorage.removeItem('usuarioConectado');
    window.location.href = 'index.html';
});