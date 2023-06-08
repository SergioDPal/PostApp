'use strict';

const getDB = require('../../getConnection');
const { generateError } = require('../../../helpers');
const { userPostQuery } = require('../allQueries');

/**
 * Returns a user's array of 10 posts starting from the offset.
 *
 * @param {number} id - Id of the user.
 * @param {number} offset - Offset of the posts.
 *
 * @returns {object} - Object with the user's posts data.
 *
 * @throws {Error} - If the user or the post is not found.
 *
 * @example selectUserPostQuery(2,20)
 */
const selectUserPostQuery = async (id, offset) => {
  let connection;

  try {
    connection = await getDB();
    const [posts] = await connection.query(userPostQuery, [id, id, offset]);
    if (posts.length < 1) {
      generateError('Post not found', 404);
    }

    posts.forEach((post) => {
      if (post.user_status === 'deleted') {
        post.user_name = 'Deleted user';
      }
      delete post.user_status;
    });

    return posts;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserPostQuery;
