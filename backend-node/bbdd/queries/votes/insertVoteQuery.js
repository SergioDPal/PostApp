'use strict';

const { generateError } = require('../../../helpers');
const getDB = require('../../getConnection');

/**
 * Inserts a vote in the database.
 * @param {string} value - Value of the vote.
 * @param {number} postId - Id of the post.
 * @param {number} token - Id of the user.
 * @returns {object} - Object with the value of the vote.
 * @example insertVoteQuery(value, postId, token)
 * @throws {Error} - If there is an error.
 * @throws {Error} - If the vote already exists.
 */
const insertVoteQuery = async (value, postId, token) => {
  let connection;

  try {
    connection = await getDB();

    const [previousVote] = await connection.query(
      `
            SELECT value 
            FROM votes
            WHERE id_post=? AND id_user=?
            `,
      [postId, token]
    );

    if (previousVote.length < 1) {
      await connection.query(
        `
                    INSERT INTO votes (value, id_post, id_user)
                    VALUES (?, ?, ?)
                `,
        [value, postId, token]
      );
    } else {
      if (previousVote[0].value === value) {
        generateError('This vote already exists.', 400);
      } else {
        await connection.query(
          `
                    UPDATE votes
                    SET value=?
                    WHERE id_post=? AND id_user=?
                    `,
          [value, postId, token]
        );
      }
    }
    return { value };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertVoteQuery;
