'use strict';

const getDB = require('../../getConnection');

const insertPostQuery = async (title, content, token) => {
  let connection;

  try {
    connection = await getDB();

    const res = await connection.query(
      `
                INSERT INTO posts (title, content, id_user)
                VALUES (?, ?, ?)
            `,
      [title, content, token]
    );

    return res[0].insertId;
  } catch (err) {
    if (err.errno === 1062)
      return {
        code: 409,
        message: 'Título duplicado, por favor elige uno diferente.',
      };
    throw err;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPostQuery;
