'use strict';
const generateError = require('../../../helpers');

const getDB = require('../../getConnection');

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
    generateError('Error inesperado durante la solicitud', 500);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = anonymizeUserQuery;
