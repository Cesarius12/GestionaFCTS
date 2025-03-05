// Objetivo: Contiene las funciones de servicio para manejar todas las operaciones con empresas
async function getEmpresa() {
    try {
        const res = await fetch('http://localhost:3000/empresa');
        if (!res.ok) throw new Error(`Error en la respuesta: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener empresa:', error);
        throw error;
    }
}

async function getEmpresaById(empresaID) {
    try {
        const res = await fetch(`http://localhost:3000/empresa/${empresaID}`);
        if (!res.ok) throw new Error(`Error al obtener alumno: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener empresa:', error);
        throw error;
    }
}

async function createEmpresa(empresaData) {
    try {
        if (empresaData.fecha_constituicion){
            empresaData.fecha_constituicion = new Date(empresaData.fecha_constituicion)
                .toISOString().split('T')[0];
        }
        if (empresaData.fecha_alta) {
            empresaData.fecha_alta = new Date(empresaData.fecha_alta)
                .toISOString().split('T')[0];
        }

        const res = await fetch('http://localhost:3000/empresa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empresaData)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al crear empresa: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error al crear empresa:', error);
        throw error;
    }
}

async function updateEmpresa(empresaData, empresaId) {
    try {
        //Forzamos la fecha a tener el formato sql
        if (empresaData.fecha_constituicion) {
            empresaData.fecha_constituicion = new Date(empresaData.fecha_constituicion)
                .toISOString().split('T')[0];
        }
        if (empresaData.fecha_alta) {
            empresaData.fecha_alta = new Date(empresaData.fecha_alta)
                .toISOString().split('T')[0];
        }

        const res = await fetch(`http://localhost:3000/empresa/${empresaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empresaData)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al actualizar Empresa: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error al actualizar empresa:', error);
        throw error;
    }
}

async function deleteEmpresa(empresaId) {
    try {
        const res = await fetch(`http://localhost:3000/empresa/${empresaId}`, {
            method: 'DELETE'
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al eliminar Empresa: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error al eliminar Empresa:', error);
        throw error;
    }
}

export { getEmpresa, getEmpresaById, createEmpresa, updateEmpresa, deleteEmpresa }; 