'use strict';

const getDB = require('../../getConnection');
const { deleteVoteQuery: query } = require('../allQueries');
/**
 * Deletes the vote in the database.
 *
 * @param {number} postId - Id of the post.
 * @param {number} tokenId - Id of the user.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is an error.
 *
 * @example deleteVoteQuery(1, 1);
 */
const deleteVoteQuery = async (postId, tokenId) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(query, [postId, tokenId]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteVoteQuery;
