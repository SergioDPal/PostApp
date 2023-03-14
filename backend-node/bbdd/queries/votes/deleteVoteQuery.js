'use strict';

const getDB = require('../../getConnection');

/**
 * Deletes the vote data in the database.
 * @param {number} postId - Id of the post.
 * @param {number} tokenId - Id of the user.
 * @returns {void}
 * @example deleteVoteQuery(1, 1);
 * @throws {Error} - If there is an error.
 */
const deleteVoteQuery = async (postId, tokenId) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(
      `
            DELETE  
            FROM votes
            WHERE id_post=? AND id_user=?
            `,
      [postId, tokenId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteVoteQuery;
