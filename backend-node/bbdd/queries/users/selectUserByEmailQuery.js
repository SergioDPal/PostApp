'use strict';

const getDB = require('../../getConnection');

const { generateError } = require('../../../helpers');

const selectUserByEmailQuery = async (email) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT id, name, email, password, createdAt, avatar FROM users WHERE email = ?`,
      [email]
    );

    // Si el array de usuarios está vacío lanzo un error.
    if (users.length < 1) {
      generateError('Usuario no encontrado', 404);
    }

    // Si existe algún usuario, sabemos que como máximo solo puede haber uno dado que el
    // email no puede repetirse. Retornamos al usuario de la posición 0.

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByEmailQuery;
