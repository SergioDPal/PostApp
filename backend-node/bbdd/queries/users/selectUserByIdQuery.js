'use strict';

const getDB = require('../../getConnection');

const { generateError } = require('../../../helpers');

const selectUserByIdQuery = async (id, tokenID) => {
  let connection;

  try {
    connection = await getDB();
    let [users] = '';
    if (Number(id) === tokenID) {
      [users] = await connection.query(
        `SELECT u.id, u.status, u.name, u.email, u.createdAt, u.avatar, u.avatar_name,
                (SELECT COUNT(*) FROM posts WHERE id_user = ?) AS postcount
                FROM users AS u
                LEFT JOIN posts AS p ON (p.id_user = u.id)
                WHERE u.id = ?
                GROUP BY u.id;`,
        [id, id]
      );
    } else {
      [users] = await connection.query(
        `SELECT u.id, u.status, u.name, u.createdAt, u.avatar, u.avatar_name,
              (SELECT COUNT(*) FROM posts WHERE id_user = ?) AS postcount
              FROM users AS u
              LEFT JOIN posts AS p ON (p.id_user = u.id)
              WHERE u.id = ?
              GROUP BY u.id;`,
        [id, id]
      );
    }

    // Si el array de usuarios está vacío lanzo un error.
    if (users.length < 1) {
      generateError('Usuario no encontrado', 404);
    }
    const user = users[0];
    if (user.status === 'deleted') {
      delete user.id;
      user.name = 'usuario eliminado';
    }
    delete user.status;

    // Retornamos al usuario de la posición 0.
    return user;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByIdQuery;
