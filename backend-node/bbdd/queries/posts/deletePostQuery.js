'use strict';
const generateError = require('../../../helpers');
const {
  deleteVotesFromPostQuery,
  deletePostQuery: postQuery,
} = require('../allQueries');
const getDB = require('../../getConnection');

/**
 * Deletes the post and related votes in the database.
 *
 * @param {number} postId - Id of the post.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is an error.
 *
 * @example deletePostQuery(1);
 */
const deletePostQuery = async (postId) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(deleteVotesFromPostQuery, [postId]);

    await connection.query(postQuery, [postId]);
  } catch (err) {
    generateError('Unexpected error during the request.', 500);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePostQuery;
