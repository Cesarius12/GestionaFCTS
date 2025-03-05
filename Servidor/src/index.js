// Importar el módulo de express
const express = require("express");
// Crear una instancia de express
const app = express();
// Definir el puerto
const port = 3000;
// Importar el módulo de la base de datos
const database = require("./database");
// Importar el módulo de cors
const cors = require("cors");

// Configurar CORS primero para que pase por el puerto del live server o su servidor local
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5501"]
}));

// Configurar el parser de JSON
app.use(express.json());

// Configurar el puerto
app.set("port", port);

// Rutas después de la configuración

//get para obtener todos los datos de la tabla que queramos
app.get("/users", async (req, res) => {
  const connection = await database.getConnection();
  connection.query("SELECT * FROM usuarios", function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/profesores", async (req, res) => {
  const connection = await database.getConnection();
  connection.query("SELECT * FROM profesores", function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});
//get con parametro de id para obtener un solo dato que pasaremos por la url
app.get("/profesores/:id", async (req, res) => {
    try {
        const profesorId = req.params.id;
        const connection = await database.getConnection();
        
        // Ejecutar la consulta y manejar la conexión adecuadamente con el id del profesor que queremos
        const query = "SELECT * FROM profesores WHERE id_profesor = ?";
        connection.query(query, [profesorId], function (error, results, fields) {
            if (error) {
                console.error('Error en la consulta:', error);
                res.status(500).json({ 
                    message: "Error al obtener profesor", 
                    error: error.message 
                });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ message: "Profesor no encontrado" });
                return;
            }

            res.json(results);
        });
    } catch (error) {
        console.error('Error al obtener profesor:', error);
        res.status(500).json({ 
            message: "Error al obtener profesor", 
            error: error.message 
        });
    }
});
//post para insertar un nuevo dato en la tabla que queramos, he hecho 2 maneras diferentes ya que aqui todavia estaba empezando a entender como funcionaba
app.post("/profesores", async (req, res) => {
    try {
        const profesorData = req.body;
        console.log('Datos recibidos:', profesorData);

        const connection = await database.getConnection();
        // Construir la consulta de inserción
        const insertQuery = `
            INSERT INTO profesores (
                nombre,
                dni,
                email,
                telefono,
                departamento,
                rol,
                estado,
                tipo_contrato       
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        // Valores a insertar
        const insertValues = [
            profesorData.nombre,
            profesorData.dni,
            profesorData.email,
            profesorData.telefono,
            profesorData.departamento,
            profesorData.rol,
            profesorData.estado,
            profesorData.tipoContrato
        ];

        console.log('Query:', insertQuery);
        console.log('Valores:', insertValues);

        connection.query(insertQuery, insertValues, function(error, results) {
            if (error) {
                console.error('Error en la inserción:', error);
                res.status(500).json({ 
                    message: "Error al crear profesor", 
                    error: error.message,
                    sqlMessage: error.sqlMessage 
                });
                return;
            }

            console.log('Inserción exitosa:', results);
            res.status(201).json({ 
                message: "Profesor creado correctamente",
                id: results.insertId
            });
        });

    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ 
            message: "Error al crear profesor", 
            error: error.message 
        });
    }
});

//put para actualizar un dato en la tabla que queramos con el id que pasamos por la url
app.put("/profesores/:id", async (req, res) => {
    try {
        const profesorId = req.params.id;
        const profesorData = req.body;
        console.log('ID recibido:', profesorId);
        console.log('Datos recibidos:', profesorData);
        
        const connection = await database.getConnection();

        // Verificar si el profesor existe
        connection.query("SELECT * FROM profesores WHERE id_profesor = ?", [profesorId], 
            function(error, results) {
                if (error) {
                    console.error('Error al verificar profesor:', error);
                    res.status(500).json({ 
                        message: "Error al verificar profesor", 
                        error: error.message,
                        sqlMessage: error.sqlMessage
                    });
                    return;
                }

                if (results.length === 0) {
                    res.status(404).json({ message: "Profesor no encontrado" });
                    return;
                }

                // Construir la consulta de actualización
                const updateQuery = `
                    UPDATE profesores 
                    SET nombre = ?,
                        dni = ?,
                        email = ?,
                        telefono = ?,
                        departamento = ?,
                        rol = ?,
                        estado = ?,
                        tipo_contrato = ?
                    WHERE id_profesor = ?
                `;
                // Valores a actualizar
                const updateValues = [
                    profesorData.nombre,
                    profesorData.dni,
                    profesorData.email,
                    profesorData.telefono,
                    profesorData.departamento,
                    profesorData.rol,
                    profesorData.estado, 
                    profesorData.tipo_contrato,
                    profesorId
                ];

                console.log('Query:', updateQuery);
                console.log('Valores:', updateValues);

                // Ejecutar la actualización
                connection.query(updateQuery, updateValues, function(updateError, updateResults) {
                    if (updateError) {
                        console.error('Error en la actualización:', updateError);
                        res.status(500).json({ 
                            message: "Error al actualizar profesor", 
                            error: updateError.message,
                            sqlMessage: updateError.sqlMessage,
                            sqlState: updateError.sqlState,
                            query: updateQuery,
                            values: updateValues
                        });
                        return;
                    }

                    console.log('Actualización exitosa:', updateResults);
                    res.json({ 
                        message: "Profesor actualizado correctamente",
                        affectedRows: updateResults.affectedRows
                    });
                });
            });

    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ 
            message: "Error al actualizar profesor", 
            error: error.message,
            stack: error.stack
        });
    }
});

//  delete para eliminar lo que queramos de la tabla que queramos con el id que pasamos por la url
app.delete("/profesores/:id", async (req, res) => {
    try {
        const profesorId = req.params.id;
        console.log('Intentando eliminar profesor con ID:', profesorId);

        const connection = await database.getConnection();

        // Primero verificamos si el profesor existe
        connection.query("SELECT * FROM profesores WHERE id_profesor = ?", [profesorId], 
            function(error, results) {
                if (error) {
                    console.error('Error al verificar profesor:', error);
                    res.status(500).json({ 
                        message: "Error al eliminar profesor", 
                        error: error.message 
                    });
                    return;
                }

                if (results.length === 0) {
                    res.status(404).json({ message: "Profesor no encontrado" });
                    return;
                }

                // Si el profesor existe, procedemos a eliminarlo
                connection.query("DELETE FROM profesores WHERE id_profesor = ?", [profesorId], 
                    function(deleteError, deleteResults) {
                        if (deleteError) {
                            console.error('Error al eliminar profesor:', deleteError);
                            res.status(500).json({ 
                                message: "Error al eliminar profesor", 
                                error: deleteError.message 
                            });
                            return;
                        }

                        console.log('Profesor eliminado:', deleteResults);
                        res.json({ 
                            message: "Profesor eliminado correctamente",
                            affectedRows: deleteResults.affectedRows
                        });
                    });
            });

    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ 
            message: "Error al eliminar profesor", 
            error: error.message 
        });
    }
});

// Rutas para alumnos, a partir de aquí se repite el mismo proceso que con los demas datos exceptuando el post y put
app.get("/alumnos", async (req, res) => {
    try {
        const connection = await database.getConnection();
        connection.query("SELECT * FROM alumnos", function (error, results, fields) {
            if (error) {
                console.error('Error al obtener alumnos:', error);
                res.status(500).json({ message: "Error al obtener alumnos", error: error.message });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ message: "Error al obtener alumnos", error: error.message });
    }
});

app.get("/alumnos/:id", async (req, res) => {
    try {
        const connection = await database.getConnection();
        connection.query(
            "SELECT * FROM alumnos WHERE id_alumno = ?",
            [req.params.id],
            function (error, results, fields) {
                if (error) {
                    console.error('Error al obtener alumno:', error);
                    res.status(500).json({ message: "Error al obtener alumno", error: error.message });
                    return;
                }
                if (results.length === 0) {
                    res.status(404).json({ message: "Alumno no encontrado" });
                    return;
                }
                res.json(results[0]);
            }
        );
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ message: "Error al obtener alumno", error: error.message });
    }
});
//post para insertar un nuevo dato en la tabla que queramos, he hecho 2 maneras diferentes ya que aqui ya entendi mejor como manejar los objetos
app.post("/alumnos", async (req, res) => {
    try {
        const connection = await database.getConnection();
        const alumno = req.body;
        //a la consulta le pasamos en la ? un objeto creado en el js
        connection.query(
            "INSERT INTO alumnos SET ?",
            alumno,
            function (error, results) {
                if (error) {
                    console.error('Error al crear alumno:', error);
                    res.status(500).json({ 
                        message: "Error al crear alumno", 
                        error: error.message 
                    });
                    return;
                }
                res.status(201).json({ 
                    message: "Alumno creado correctamente",
                    id: results.insertId 
                });
            }
        );
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ 
            message: "Error al crear alumno", 
            error: error.message 
        });
    }
});
//put para actualizar un dato en la tabla que queramos con el id que pasamos por la url
app.put("/alumnos/:id", async (req, res) => {
  try {
    const connection = await database.getConnection();
    const alumno = req.body;
    const alumnoId = req.params.id;

    connection.query(
      "UPDATE alumnos SET ? WHERE id_alumno = ?",
      [alumno, alumnoId],
      function (error, results, fields) {
        if (error) {
          console.error('Error al actualizar alumno:', error);
          res.status(500).json({ 
            message: "Error al actualizar alumno", 
            error: error.message 
          });
          return;
        }
        res.json({ 
          message: "Alumno actualizado correctamente",
          affectedRows: results.affectedRows 
        });
      }
    );
  } catch (error) {
    console.error('Error general:', error);
    res.status(500).json({ 
      message: "Error al actualizar alumno", 
      error: error.message 
    });
  }
});

app.delete("/alumnos/:id", async (req, res) => {
    try {
        const connection = await database.getConnection();
        const alumnoId = req.params.id;

        connection.query(
            "DELETE FROM alumnos WHERE id_alumno = ?",
            [alumnoId],
            function (error, results) {
                if (error) {
                    console.error('Error al eliminar alumno:', error);
                    res.status(500).json({ 
                        message: "Error al eliminar alumno", 
                        error: error.message 
                    });
                    return;
                }
                if (results.affectedRows === 0) {
                    res.status(404).json({ message: "Alumno no encontrado" });
                    return;
                }
                res.json({ message: "Alumno eliminado correctamente" });
            }
        );
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ 
            message: "Error al eliminar alumno", 
            error: error.message 
        });
    }
});

app.put("/alumnos/:id", async (req, res) => {
    try {
      const connection = await database.getConnection();
      const alumno = req.body;
      const alumnoId = req.params.id;
  
      connection.query(
        "UPDATE alumnos SET ? WHERE id_alumno = ?",
        [alumno, alumnoId],
        function (error, results, fields) {
          if (error) {
            console.error('Error al actualizar alumno:', error);
            res.status(500).json({ 
              message: "Error al actualizar alumno", 
              error: error.message 
            });
            return;
          }
          res.json({ 
            message: "Alumno actualizado correctamente",
            affectedRows: results.affectedRows 
          });
        }
      );
    } catch (error) {
      console.error('Error general:', error);
      res.status(500).json({ 
        message: "Error al actualizar alumno", 
        error: error.message 
      });
    }
  });

  //Alumnos en practicas lo mismo que arriba la unica consulta diferente es un inner join en la linea 530 donde saco solo los que estan asignados a una empresa

  app.put("/alumnosPracticas/:id", async (req, res) => {
    try {
      const connection = await database.getConnection();
      const practicas = req.body;
      const alumnoId = req.params.id;
  
      connection.query(
        "UPDATE practicas SET ? WHERE idAlumno = ?",
        [practicas, alumnoId],
        function (error, results, fields) {
          if (error) {
            console.error('Error al actualizar Practicas:', error);
            res.status(500).json({ 
              message: "Error al actualizar Practicas", 
              error: error.message 
            });
            return;
          }
          res.json({ 
            message: "Practicas actualizado correctamente",
            affectedRows: results.affectedRows 
          });
        }
      );
    } catch (error) {
      console.error('Error general:', error);
      res.status(500).json({ 
        message: "Error al actualizar Practicas", 
        error: error.message 
      });
    }
  });

app.get("/alumnosPracticas/:id", async (req, res) => {
    try {
        const connection = await database.getConnection();
        connection.query(
            "SELECT * FROM practicas INNER JOIN alumnos on practicas.idAlumno=alumnos.id_alumno WHERE id_alumno = ?",
            [req.params.id],
            function (error, results, fields) {
                if (error) {
                    console.error('Error al obtener alumno:', error);
                    res.status(500).json({ message: "Error al obtener alumno", error: error.message });
                    return;
                }
                if (results.length === 0) {
                    res.status(404).json({ message: "Alumno no encontrado" });
                    return;
                }
                res.json(results[0]);
            }
        );
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ message: "Error al obtener alumno", error: error.message });
    }
});

app.get("/alumnosPracticas", async (req, res) => {
    try {
        const connection = await database.getConnection();
        connection.query("SELECT * FROM practicas INNER JOIN alumnos ON practicas.idAlumno = alumnos.id_alumno ", function (error, results, fields) {
            if (error) {
                console.error('Error al obtener alumnos:', error);
                res.status(500).json({ message: "Error al obtener alumnos", error: error.message });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ message: "Error al obtener alumnos", error: error.message });
    }
});
app.get("/alumnosPracticasAsig", async (req, res) => {
    const estado='ASIGNADO A EMPRESA';
    try {
        const connection = await database.getConnection();
        connection.query("SELECT * FROM practicas INNER JOIN alumnos ON practicas.idAlumno = alumnos.id_alumno INNER JOIN empresas ON practicas.idEmpresa = empresas.idEmpresa INNER JOIN contactos ON practicas.idContacto = contactos.idCon INNER JOIN profesores ON practicas.idTutor = profesores.id_profesor WHERE practicas.estadoEmp=?",[estado], function (error, results, fields) {
            if (error) {
                console.error('Error al obtener alumnos:', error);
                res.status(500).json({ message: "Error al obtener alumnos", error: error.message });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ message: "Error al obtener alumnos", error: error.message });
    }
});

// Rutas para empresas

app.get("/empresa", async (req, res) => {
    try {
        const connection = await database.getConnection();
        connection.query("SELECT * FROM empresas", function (error, results, fields) {
            if (error) {
                console.error('Error al obtener empresa:', error);
                res.status(500).json({ message: "Error al obtener empresa", error: error.message });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ message: "Error al obtener empresa", error: error.message });
    }
});

app.get("/empresa/:id", async (req, res) => {
    try {
        const connection = await database.getConnection();
        connection.query(
            "SELECT * FROM empresas WHERE idEmpresa = ?",
            [req.params.id],
            function (error, results, fields) {
                if (error) {
                    console.error('Error al obtener empresa:', error);
                    res.status(500).json({ message: "Error al obtener empresa", error: error.message });
                    return;
                }
                if (results.length === 0) {
                    res.status(404).json({ message: "Empresa no encontrado" });
                    return;
                }
                res.json(results[0]);
            }
        );
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ message: "Error al obtener empresa", error: error.message });
    }
});

app.post("/empresa", async (req, res) => {
    try {
        const connection = await database.getConnection();
        const empresa = req.body;

        connection.query(
            "INSERT INTO empresas SET ?",
            empresa,
            function (error, results) {
                if (error) {
                    console.error('Error al crear empresa:', error);
                    res.status(500).json({ 
                        message: "Error al crear empresa", 
                        error: error.message 
                    });
                    return;
                }
                res.status(201).json({ 
                    message: "Empresa creado correctamente",
                    id: results.insertId 
                });
            }
        );
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ 
            message: "Error al crear Empresa", 
            error: error.message 
        });
    }
});

app.put("/empresa/:id", async (req, res) => {
  try {
    const connection = await database.getConnection();
    const empresa = req.body;
    const empresaId = req.params.id;

    connection.query(
      "UPDATE empresas SET ? WHERE idEmpresa = ?",
      [empresa, empresaId],
      function (error, results, fields) {
        if (error) {
          console.error('Error al actualizar empresa:', error);
          res.status(500).json({ 
            message: "Error al actualizar empresa", 
            error: error.message 
          });
          return;
        }
        res.json({ 
          message: "Empresa actualizado correctamente",
          affectedRows: results.affectedRows 
        });
      }
    );
  } catch (error) {
    console.error('Error general:', error);
    res.status(500).json({ 
      message: "Error al actualizar empresa", 
      error: error.message 
    });
  }
});

app.delete("/empresa/:id", async (req, res) => {
    try {
        const connection = await database.getConnection();
        const empresaId = req.params.id;

        connection.query(
            "DELETE FROM empresas WHERE idEmpresa = ?",
            [empresaId],
            function (error, results) {
                if (error) {
                    console.error('Error al eliminar Empresa:', error);
                    res.status(500).json({ 
                        message: "Error al eliminar empresa", 
                        error: error.message 
                    });
                    return;
                }
                if (results.affectedRows === 0) {
                    res.status(404).json({ message: "empresa no encontrado" });
                    return;
                }
                res.json({ message: "Empresa eliminado correctamente" });
            }
        );
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ 
            message: "Error al eliminar empresa", 
            error: error.message 
        });
    }
});

// Rutas para contactos

app.get("/contacto", async (req, res) => {
    try {
        const connection = await database.getConnection();
        connection.query("SELECT * FROM contactos", function (error, results, fields) {
            if (error) {
                console.error('Error al obtener contactos:', error);
                res.status(500).json({ message: "Error al obtener contactos", error: error.message });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ message: "Error al obtener contactos", error: error.message });
    }
});

app.get("/contacto/:id", async (req, res) => {
    try {
        const connection = await database.getConnection();
        connection.query(
            "SELECT * FROM contactos WHERE idCon = ?",
            [req.params.id],
            function (error, results, fields) {
                if (error) {
                    console.error('Error al obtener contacto:', error);
                    res.status(500).json({ message: "Error al obtener contacto", error: error.message });
                    return;
                }
                if (results.length === 0) {
                    res.status(404).json({ message: "contacto no encontrado" });
                    return;
                }
                res.json(results[0]);
            }
        );
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ message: "Error al obtener contacto", error: error.message });
    }
});

app.post("/contacto", async (req, res) => {
    try {
        const connection = await database.getConnection();
        const contacto = req.body;

        connection.query(
            "INSERT INTO contactos SET ?",
            contacto,
            function (error, results) {
                if (error) {
                    console.error('Error al crear contacto:', error);
                    res.status(500).json({ 
                        message: "Error al crear contacto", 
                        error: error.message 
                    });
                    return;
                }
                res.status(201).json({ 
                    message: "contacto creado correctamente",
                    id: results.insertId 
                });
            }
        );
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ 
            message: "Error al crear contacto", 
            error: error.message 
        });
    }
});

app.put("/contacto/:id", async (req, res) => {
  try {
    const connection = await database.getConnection();
    const contacto = req.body;
    const contactoId = req.params.id;

    connection.query(
      "UPDATE contactos SET ? WHERE idCon = ?",
      [contacto, contactoId],
      function (error, results, fields) {
        if (error) {
          console.error('Error al actualizar contacto:', error);
          res.status(500).json({ 
            message: "Error al actualizar contacto", 
            error: error.message 
          });
          return;
        }
        res.json({ 
          message: "contacto actualizado correctamente",
          affectedRows: results.affectedRows 
        });
      }
    );
  } catch (error) {
    console.error('Error general:', error);
    res.status(500).json({ 
      message: "Error al actualizar contacto", 
      error: error.message 
    });
  }
});

app.delete("/contacto/:id", async (req, res) => {
    try {
        const connection = await database.getConnection();
        const contactoId = req.params.id;

        connection.query(
            "DELETE FROM contactos WHERE idCon = ?",
            [contactoId],
            function (error, results) {
                if (error) {
                    console.error('Error al eliminar contacto:', error);
                    res.status(500).json({ 
                        message: "Error al eliminar contacto", 
                        error: error.message 
                    });
                    return;
                }
                if (results.affectedRows === 0) {
                    res.status(404).json({ message: "contacto no encontrado" });
                    return;
                }
                res.json({ message: "contacto eliminado correctamente" });
            }
        );
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ 
            message: "Error al eliminar contacto", 
            error: error.message 
        });
    }
});

// Rutas para seguimientos

app.get("/seguimiento", async (req, res) => {
    try {
        const connection = await database.getConnection();
        connection.query("SELECT * FROM seguimiento", function (error, results, fields) {
            if (error) {
                console.error('Error al obtener datos:', error);
                res.status(500).json({ message: "Error al obtener datos", error: error.message });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ message: "Error al obtener datos", error: error.message });
    }
});

app.get("/seguimiento/:id", async (req, res) => {
    try {
        const connection = await database.getConnection();
        connection.query(
            "SELECT * FROM seguimiento WHERE id_seguimiento = ?",
            [req.params.id],
            function (error, results, fields) {
                if (error) {
                    console.error('Error al obtener seguimiento:', error);
                    res.status(500).json({ message: "Error al obtener seguimiento", error: error.message });
                    return;
                }
                if (results.length === 0) {
                    res.status(404).json({ message: "seguimiento no encontrado" });
                    return;
                }
                res.json(results[0]);
            }
        );
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ message: "Error al obtener seguimiento", error: error.message });
    }
});

app.post("/seguimiento", async (req, res) => {
    try {
        const connection = await database.getConnection();
        const datos = req.body;

        connection.query(
            "INSERT INTO seguimiento SET ?",
            datos,
            function (error, results) {
                if (error) {
                    console.error('Error al crear nueva entrada en seguimiento:', error);
                    res.status(500).json({ 
                        message: "Error al crear entrada en seguimiento", 
                        error: error.message 
                    });
                    return;
                }
                res.status(201).json({ 
                    message: "seguimiento creado correctamente",
                    id: results.insertId 
                });
            }
        );
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ 
            message: "Error al crear seguimiento", 
            error: error.message 
        });
    }
});

app.put("/seguimiento/:id", async (req, res) => {
    try {
      const connection = await database.getConnection();
      const seguimiento = req.body;
      const segId = req.params.id;
  
      connection.query(
        "UPDATE seguimiento SET ? WHERE id_seguimiento = ?",
        [seguimiento, segId],
        function (error, results, fields) {
          if (error) {
            console.error('Error al actualizar seguimiento:', error);
            res.status(500).json({ 
              message: "Error al actualizar seguimiento", 
              error: error.message 
            });
            return;
          }
          res.json({ 
            message: "seguimiento actualizado correctamente",
            affectedRows: results.affectedRows 
          });
        }
      );
    } catch (error) {
      console.error('Error general:', error);
      res.status(500).json({ 
        message: "Error al actualizar seguimiento", 
        error: error.message 
      });
    }
  });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


