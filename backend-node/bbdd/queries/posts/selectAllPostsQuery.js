'use strict';

const getDB = require('../../getConnection');
const { generateError } = require('../../../helpers');
const {
  allPostsQueryWithId: queryWithId,
  allPostsQueryWithoutId: queryWithoutId,
} = require('../allQueries');

/**
 * Returns the next 10 posts starting from the offset. If the user is logged in, it will return the user's vote.
 *
 * @param {number} userId - Id of the user.
 * @param {number} offset - Offset of the posts.
 *
 * @returns {object} - Posts data.
 *
 * @example selectAllPostsQuery(1, 0);
 *
 * @throws {Error} - If there is an error.
 */
const selectAllPostsQuery = async (userId, offset) => {
  let connection;

  try {
    connection = await getDB();

    const [posts] = await connection.query(
      ...(userId ? [queryWithId, [userId, offset]] : [queryWithoutId, [offset]])
    );
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

module.exports = selectAllPostsQuery;
