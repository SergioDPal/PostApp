'use strict';

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_BBDD } = process.env;

let pool;

/**
 * Returns a connection to the database.
 * @returns {Promise<Connection>} - Connection to the database.
 * @example getDB();
 * @throws {Error} - If there is an error.
 * @throws {Error} - If there is an error connecting to the database.
 */
const getDB = async () => {
  try {
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

    return await pool.getConnection();
  } catch (err) {
    console.error(err);

    throw new Error('Error connecting to the database');
  }
};

module.exports = getDB;
