'use strict';
const generateError = require('../../../helpers');

const getDB = require('../../getConnection');

const deletePostQuery = async (postId) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(
      `
            DELETE  
            FROM votes
            WHERE id_post=?
            `,
      [postId]
    );

    await connection.query(
      `
            DELETE  
            FROM posts
            WHERE id=?
            `,
      [postId]
    );
  } catch (err) {
    generateError('Error inesperado durante la solicitud', 500);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePostQuery;
