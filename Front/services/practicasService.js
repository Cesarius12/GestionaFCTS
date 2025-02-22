// Funciones de servicio para manejar todas las operaciones con alumnos
async function getPracticas() {
    try {
        const res = await fetch('http://localhost:3000/alumnosPracticas');
        if (!res.ok) throw new Error(`Error en la respuesta: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener alumnos:', error);
        throw error;
    }
}

async function getPracticasById(alumnoId) {
    try {
        const res = await fetch(`http://localhost:3000/alumnosPracticas/${alumnoId}`);
        if (!res.ok) throw new Error(`Error al obtener alumno: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener alumno:', error);
        throw error;
    }
}

async function getPracticasAsig() {
    try {
        const res = await fetch('http://localhost:3000/alumnosPracticasAsig');
        if (!res.ok) throw new Error(`Error en la respuesta: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener Practicas:', error);
        throw error;
    }
}

async function updatePracticas(alumnoId, alumnoData) {
    if (alumnoData.fechaInicio){
        alumnoData.fechaInicio = new Date(alumnoData.fechaInicio)
            .toISOString().split('T')[0];
    }
    if (alumnoData.fechaFin){
        alumnoData.fechaFin = new Date(alumnoData.fechaFin)
            .toISOString().split('T')[0];
    }
    try {
        const res = await fetch(`http://localhost:3000/alumnosPracticas/${alumnoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alumnoData),
        });
        if (!res.ok) throw new Error(`Error al actualizar alumno: ${res.status}`);
    } catch (error) {
        console.error('Error al actualizar alumno:', error);
        throw error;
    }  
}


export { getPracticas, getPracticasById, getPracticasAsig ,updatePracticas}; 