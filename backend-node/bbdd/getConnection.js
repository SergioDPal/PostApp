'use strict';

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_BBDD } = process.env;

// Variable que almacenará un grupo de conexiones.
let pool;

// Función que retorna una conexión libre con la base de datos.
const getDB = async () => {
    try {
        // Si no existe un grupo de conexiones lo creamos.
        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_BBDD,
                timezone: 'Z',
            });
        }

        // Retornamos una conexión libre con la base de datos.
        return await pool.getConnection();
    } catch (err) {
        console.error(err);

        throw new Error('Error al conectar con MySQL');
    }
};

module.exports = getDB;
