'use strict';

const getDB = require('../../getConnection');
const bcrypt = require('bcrypt');

const insertUserQuery = async (name, email, password) => {
  let connection;

  try {
    connection = await getDB();

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos el usuario.
    await connection.query(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPass]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
