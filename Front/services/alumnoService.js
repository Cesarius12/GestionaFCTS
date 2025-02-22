// Funciones de servicio para manejar todas las operaciones con alumnos
async function getAlumnos() {
    try {
        const res = await fetch('http://localhost:3000/alumnos');
        if (!res.ok) throw new Error(`Error en la respuesta: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener alumnos:', error);
        throw error;
    }
}

async function getAlumnoById(alumnoId) {
    try {
        const res = await fetch(`http://localhost:3000/alumnos/${alumnoId}`);
        if (!res.ok) throw new Error(`Error al obtener alumno: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener alumno:', error);
        throw error;
    }
}

async function getAlumnoEmpresa() {
    try {
        const res = await fetch('http://localhost:3000/alumnosPracticas');
        if (!res.ok) throw new Error(`Error en la respuesta: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener alumnos:', error);
        throw error;
    }
}

async function createAlumno(alumnoData) {
    try {
        // Asegurarse de que las fechas estén en formato YYYY-MM-DD
        if (alumnoData.fecha_nacimiento) {
            alumnoData.fecha_nacimiento = new Date(alumnoData.fecha_nacimiento)
                .toISOString().split('T')[0];
        }
        if (alumnoData.fecha_inscripcion) {
            alumnoData.fecha_inscripcion = new Date(alumnoData.fecha_inscripcion)
                .toISOString().split('T')[0];
        }


        const res = await fetch('http://localhost:3000/alumnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alumnoData)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al crear alumno: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error al crear alumno:', error);
        throw error;
    }
}

async function updateAlumno(alumnoId, alumnoData) {
    try {
        // Asegurarse de que las fechas estén en formato YYYY-MM-DD
        if (alumnoData.fecha_nacimiento) {
            alumnoData.fecha_nacimiento = new Date(alumnoData.fecha_nacimiento)
                .toISOString().split('T')[0];
        }
        if (alumnoData.fecha_inscripcion) {
            alumnoData.fecha_inscripcion = new Date(alumnoData.fecha_inscripcion)
                .toISOString().split('T')[0];
        }


        const res = await fetch(`http://localhost:3000/alumnos/${alumnoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alumnoData)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al actualizar alumno: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error al actualizar alumno:', error);
        throw error;
    }
}

async function deleteAlumno(alumnoId) {
    try {
        const res = await fetch(`http://localhost:3000/alumnos/${alumnoId}`, {
            method: 'DELETE'
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al eliminar alumno: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error al eliminar alumno:', error);
        throw error;
    }
}

export { getAlumnos, getAlumnoById, createAlumno, updateAlumno, deleteAlumno, getAlumnoEmpresa }; 