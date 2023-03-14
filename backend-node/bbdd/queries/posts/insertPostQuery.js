'use strict';

const getDB = require('../../getConnection');

/**
 * Inserts the post data in the database.
 * @param {string} title - Title of the post.
 * @param {string} content - Content of the post.
 * @param {number} token - Id of the user.
 * @returns {number} - Id of the post.
 * @example insertPostQuery('Title', 'Content', 1);
 * @throws {Error} - If there is a duplicate title.
 */
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
        message: 'There is already a post with that title.',
      };
    throw err;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPostQuery;
