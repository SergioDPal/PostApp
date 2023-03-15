'use strict';

const getDB = require('../../getConnection');

const { generateError } = require('../../../helpers');
const {
  selectUserByIdWithEmailQuery,
  selectUserByIdWithoutemailQuery,
} = require('../allQueries');
/**
 * Returns the user data from the database.
 *
 * If the requesting user is the same as the requested user, it will return the email too.
 *
 * @param {number} idOfRequestedUser - Id of the requested user.
 * @param {number} idOfRequestingUser - Id of the requesting user.
 *
 * @returns {object} - User data.
 *
 * @throws {Error} - If there is no user with the requested id.
 *
 * @example selectUserByIdQuery(1, 1);
 */
const selectUserByIdQuery = async (idOfRequestedUser, idOfRequestingUser) => {
  let connection;

  try {
    connection = await getDB();
    let [users] = '';
    if (Number(idOfRequestedUser) === idOfRequestingUser) {
      [users] = await connection.query(selectUserByIdWithEmailQuery, [
        idOfRequestedUser,
        idOfRequestedUser,
      ]);
    } else {
      [users] = await connection.query(selectUserByIdWithoutemailQuery, [
        idOfRequestedUser,
        idOfRequestedUser,
      ]);
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
