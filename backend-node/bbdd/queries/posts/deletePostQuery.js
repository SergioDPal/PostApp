'use strict';
const generateError = require('../../../helpers');

const getDB = require('../../getConnection');

/**
 * Deletes the post data in the database.
 * @param {number} postId - Id of the post.
 * @returns {void}
 * @example deletePostQuery(1);
 * @throws {Error} - If there is an error.
 */
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
    generateError('Unexpected error during the request.', 500);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePostQuery;
