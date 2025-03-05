// Objetivo: Contiene las funciones de servicio para manejar todas las operaciones con contactos
async function getContacto() {
    try {
        const res = await fetch('http://localhost:3000/contacto');
        if (!res.ok) throw new Error(`Error en la respuesta: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener contactos:', error);
        throw error;
    }
}

async function getContactoById(contactoId) {
    try {
        const res = await fetch(`http://localhost:3000/contacto/${contactoId}`);
        if (!res.ok) throw new Error(`Error al obtener contacto: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error al obtener contacto:', error);
        throw error;
    }
}

async function createContacto(contactoData) {
    try {
        if (contactoData.fechaIngreso){
            contactoData.fechaIngreso = new Date(contactoData.fechaIngreso)
                .toISOString().split('T')[0];
        }

        const res = await fetch('http://localhost:3000/contacto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactoData)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al crear contacto: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error al crear contacto:', error);
        throw error;
    }
}

async function updateContacto(contactoData, contactoId) {
    try {
        //Forzamos la fecha a tener el formato sql
        if (contactoData.fechaIngreso){
            contactoData.fechaIngreso = new Date(contactoData.fechaIngreso)
                .toISOString().split('T')[0];
        }


        const res = await fetch(`http://localhost:3000/contacto/${contactoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactoData)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al actualizar contacto: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error al actualizar contacto:', error);
        throw error;
    }
}

async function deleteContacto(contactoId) {
    try {
        const res = await fetch(`http://localhost:3000/contacto/${contactoId}`, {
            method: 'DELETE'
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `Error al eliminar contacto: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error('Error al eliminar contacto:', error);
        throw error;
    }
}

export { getContacto, createContacto, updateContacto, deleteContacto, getContactoById }; 