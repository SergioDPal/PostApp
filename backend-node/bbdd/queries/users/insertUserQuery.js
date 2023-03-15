'use strict';

const getDB = require('../../getConnection');
const { insertUserQuery: userQuery } = require('../allQueries');
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * Creates a user in the database.
 *
 * @param {string} name - Name of the user.
 * @param {string} email - Email of the user.
 * @param {string} password - Password of the user.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is an error.
 *
 * @example insertUserQuery(name, email, password)
 */
const insertUserQuery = async (name, email, password) => {
  let connection;

  try {
    connection = await getDB();

    const hashedPass = await bcrypt.hash(password, saltRounds);

    await connection.query(userQuery, [name, email, hashedPass]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
