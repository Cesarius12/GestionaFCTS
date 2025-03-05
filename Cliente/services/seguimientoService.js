// Objetivo: Contiene las funciones de servicio para manejar todas las operaciones con empresas
async function getSeguimiento() {
    try {
        const res = await fetch('http://localhost:3000/seguimiento');
        if (!res.ok) throw new Error(`Error en la respuesta: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener seguimiento:', error);
        throw error;
    }
}

async function getSegId(seguimientoID) {
    try {
        const res = await fetch(`http://localhost:3000/seguimiento/${seguimientoID}`);
        if (!res.ok) throw new Error(`Error al obtener seguimiento: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener seguimiento:', error);
        throw error;
    }
}

async function createSeguimiento(seguimientoData) {
    try {
        const res = await fetch('http://localhost:3000/seguimiento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(seguimientoData)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al crear seguimiento: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error al crear seguimiento:', error);
        throw error;
    }
}

async function updateSeguimiento(seguimientoData, seguimientoId) {
    try {
        //Forzamos la fecha a tener el formato sql
        if (seguimientoData.fecha){
            seguimientoData.fecha = new Date(seguimientoData.fecha)
                .toISOString().slice(0, 16)
        }
        if (seguimientoData.fechaProx){
            seguimientoData.fechaProx = new Date(seguimientoData.fechaProx)
                .toISOString().slice(0, 16)
        }


        const res = await fetch(`http://localhost:3000/seguimiento/${seguimientoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(seguimientoData)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al actualizar seguimiento: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error al actualizar seguimiento:', error);
        throw error;
    }
}


export { getSeguimiento, getSegId, createSeguimiento, updateSeguimiento }; 