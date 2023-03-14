'use strict';
const generateError = require('../../../helpers');

const getDB = require('../../getConnection');

/**
 * Anonymizes a user in the database by changing its name, email and password.
 * @param {number} userId - Id of the user.
 * @returns {void}
 * @example anonymizeUserQuery(userId)
 * @throws {Error} - If there is an error.
 */
const anonymizeUserQuery = async (userId) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(
      `
            UPDATE users
            SET status = 'deleted',name = ?, password = ?, email = ?, modifiedAt = ?
            WHERE id = ?
            `,
      [
        `DeletedUser${userId}`,
        `${Math.random()}`,
        `${userId}@deleted.com`,
        new Date(),
        userId,
      ]
    );
  } catch (error) {
    generateError('Unexpected error during the request.', 500);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = anonymizeUserQuery;
