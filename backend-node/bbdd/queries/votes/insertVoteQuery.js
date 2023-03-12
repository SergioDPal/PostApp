'use strict';

const { generateError } = require('../../../helpers');
const getDB = require('../../getConnection');

const insertVoteQuery = async (value, postId, token) => {
  let connection;

  try {
    connection = await getDB();

    const [prevVote] = await connection.query(
      `
            SELECT value 
            FROM votes
            WHERE id_post=? AND id_user=?
            `,
      [postId, token]
    );

    if (prevVote.length < 1) {
      await connection.query(
        `
                    INSERT INTO votes (value, id_post, id_user)
                    VALUES (?, ?, ?)
                `,
        [value, postId, token]
      );
    } else {
      if (prevVote[0].value === value) {
        generateError('Este voto ya existe', 400);
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
