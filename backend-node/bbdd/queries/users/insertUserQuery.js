'use strict';

const getDB = require('../../getConnection');
const bcrypt = require('bcrypt');

/**
 * Inserts a user in the database.
 * @param {string} name - Name of the user.
 * @param {string} email - Email of the user.
 * @param {string} password - Password of the user.
 * @returns {void}
 * @example insertUserQuery(name, email, password)
 * @throws {Error} - If there is an error.
 */
const insertUserQuery = async (name, email, password) => {
  let connection;

  try {
    connection = await getDB();

    const hashedPass = await bcrypt.hash(password, 10);

    await connection.query(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPass]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
