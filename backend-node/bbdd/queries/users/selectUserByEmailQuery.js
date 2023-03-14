'use strict';

const getDB = require('../../getConnection');

const { generateError } = require('../../../helpers');

/**
 * Selects a user by its email.
 * @param {string} email - Email of the user.
 * @returns {object} - Object with the user data.
 * @example selectUserByEmailQuery(email)
 * @throws {Error} - If there is an error.
 * @throws {Error} - If the user is not found.
 */
const selectUserByEmailQuery = async (email) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT id, name, email, password, createdAt, avatar FROM users WHERE email = ?`,
      [email]
    );

    if (users.length < 1) {
      generateError('User not found.', 404);
    }

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByEmailQuery;
