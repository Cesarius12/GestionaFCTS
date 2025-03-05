// Funciones de servicio para manejar todas las operaciones con usuarios y profesores
async function getUsers() {
    try {
        const res = await fetch('http://localhost:3000/users');
        if (!res.ok) throw new Error(`Error en la respuesta: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

async function getProfesores() {
    try {
        console.log('Solicitando lista de profesores...');
        const res = await fetch('http://localhost:3000/profesores');
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al obtener profesores: ${res.status}`);
        }

        const data = await res.json();
        console.log('Profesores recibidos:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener profesores:', error);
        throw error;
    }
}


async function getProfId(ProfId) {
    try {
        const res = await fetch(`http://localhost:3000/profesores/${ProfId}`);
        if (!res.ok) throw new Error(`Error al obtener usuario: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener profesor:', error);
        throw error;
    }
}

async function updateProf(profId, profData) {
    try {
        console.log('Datos a enviar al servidor:', {
            id: profId,
            fecha_nacimiento: profData.fecha_nacimiento,
            fecha_ingreso: profData.fecha_ingreso,
            tipo_contrato: profData.tipo_contrato
        });

        const res = await fetch(`http://localhost:3000/profesores/${profId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profData)
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al actualizar profesor: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error al actualizar profesor:', error);
        throw error;
    }
}

async function createProf(profData) {
    try {
        const res = await fetch('http://localhost:3000/profesores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profData)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al crear usuario: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error al crear profesor:', error);
        throw error;
    }
}

async function deleteProf(profId) {
    try {
        const res = await fetch(`http://localhost:3000/profesores/${profId}`, {
            method: 'DELETE'
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al eliminar profesor: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error al eliminar profesor:', error);
        throw error;
    }
}

export { getUsers, getProfId, updateProf, createProf, deleteProf, getProfesores };

