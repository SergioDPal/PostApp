'use strict';

const { generateError } = require('../../../helpers');
const getDB = require('../../getConnection');
const {
  selectVoteQuery,
  insertVoteQuery: insertQuery,
  updateVoteQuery,
} = require('../allQueries');

/**
 * Inserts a vote in the database. If the user sends a different vote, it will be updated.
 *
 * @param {string} value - Value of the vote.
 * @param {number} postId - Id of the post.
 * @param {number} userId - Id of the user.
 *
 * @returns {object} - Object with the value of the vote.
 *
 * @example insertVoteQuery(value, postId, token)
 *
 * @throws {Error} - If the vote already exists.
 */
const insertVoteQuery = async (value, postId, userId) => {
  let connection;

  try {
    connection = await getDB();

    const [previousVote] = await connection.query(selectVoteQuery, [
      postId,
      userId,
    ]);

    if (previousVote.length < 1) {
      await connection.query(insertQuery, [value, postId, userId]);
    } else {
      if (previousVote[0].value === value) {
        generateError('This vote already exists.', 400);
      } else {
        await connection.query(updateVoteQuery, [value, postId, userId]);
      }
    }

    return { value };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertVoteQuery;
