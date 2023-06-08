'use strict';
const { generateError, createAnonymizedData } = require('../../../helpers');

const getDB = require('../../getConnection');

const { anonymizeUserQuery: anonymizeQuery } = require('../allQueries');

/**
 * Anonymizes a user in the database by changing its name, email and password.
 *
 * @param {number} userId - Id of the user.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is an error.
 *
 * @example anonymizeUserQuery(userId)
 */
const anonymizeUserQuery = async (userId) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(anonymizeQuery, createAnonymizedData(userId));
  } catch (error) {
    generateError('Unexpected error during the request.', 500);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = anonymizeUserQuery;
