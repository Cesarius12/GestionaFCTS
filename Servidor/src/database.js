//Llamamos a la librería mysql2 para conectarnos a la base de datos
//Creamos una conexión con los datos de la base de datos
const mysql=require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',database: 'fct_db',user: 'cesar',password: 'cesar'});
  const getConnection = async()=> await connection;
  module.exports = {getConnection};