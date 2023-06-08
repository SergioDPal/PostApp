'use strict';

const getDB = require('../../getConnection');

const { generateError } = require('../../../helpers');
const { postByIdQuery } = require('../allQueries');

/**
 * Selects the post data from the database.
 * @param {number} id - Id of the requested post.
 * @param {number} userId - Id of the requesting user.
 * @returns {object} - Post data.
 * @example selectPostByIdQuery(1, 1);
 * @throws {Error} - If there is no post with the requested id.
 */
const selectPostByIdQuery = async (id, userId) => {
  let connection;

  try {
    connection = await getDB();

    const [posts] = await connection.query(postByIdQuery, [userId, id]);

    if (posts.length < 1) {
      generateError('Post not found', 404);
    }

    const post = posts[0];

    if (post.user_status === 'deleted') {
      post.user_name = 'Deleted user';
    }

    delete post.user_status;

    return post;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectPostByIdQuery;
