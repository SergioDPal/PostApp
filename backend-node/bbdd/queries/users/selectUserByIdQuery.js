'use strict';

const getDB = require('../../getConnection');

const { generateError } = require('../../../helpers');

/**
 * Selects the user data from the database. If the requesting user is the same as the requested user, it will return the email too.
 * @param {number} idOfRequestedUser - Id of the requested user.
 * @param {number} idOfRequestingUser - Id of the requesting user.
 * @returns {object} - User data.
 * @example selectUserByIdQuery(1, 1);
 * @throws {Error} - If there is no user with the requested id.
 */
const selectUserByIdQuery = async (idOfRequestedUser, idOfRequestingUser) => {
  let connection;

  try {
    connection = await getDB();
    let [users] = '';
    if (Number(idOfRequestedUser) === idOfRequestingUser) {
      [users] = await connection.query(
        `SELECT u.id, u.status, u.name, u.email, u.createdAt, u.avatar, u.avatar_name,
                (SELECT COUNT(*) FROM posts WHERE id_user = ?) AS postcount
                FROM users AS u
                LEFT JOIN posts AS p ON (p.id_user = u.id)
                WHERE u.id = ?
                GROUP BY u.id;`,
        [idOfRequestedUser, idOfRequestedUser]
      );
    } else {
      [users] = await connection.query(
        `SELECT u.id, u.status, u.name, u.createdAt, u.avatar, u.avatar_name,
              (SELECT COUNT(*) FROM posts WHERE id_user = ?) AS postcount
              FROM users AS u
              LEFT JOIN posts AS p ON (p.id_user = u.id)
              WHERE u.id = ?
              GROUP BY u.id;`,
        [idOfRequestedUser, idOfRequestedUser]
      );
    }

    if (users.length < 1) {
      generateError('User not found.', 404);
    }
    const user = users[0];
    if (user.status === 'deleted') {
      delete user.id;
      user.name = 'Deleted user';
    }
    delete user.status;

    return user;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByIdQuery;
