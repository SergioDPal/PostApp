'use strict';

const getDB = require('../../getConnection');
const { selectUserByEmailQuery: query } = require('../allQueries');
const { generateError } = require('../../../helpers');

/**
 * Returns a user by its email.
 *
 * @param {string} email - Email of the user.
 *
 * @returns {object} - Object with the user data.
 *
 * @throws {Error} - If the user is not found.
 *
 * @example selectUserByEmailQuery(email)
 */
const selectUserByEmailQuery = async (email) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(query, [email]);

    if (users.length < 1) {
      generateError('User not found.', 404);
    }

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByEmailQuery;
