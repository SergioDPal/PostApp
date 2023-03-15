'use strict';

require('dotenv').config();
const getDB = require('./getConnection');
const { createTestContentQueries } = require('../helpers');

/**
 * Creates random content in the database.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is an error.
 */
async function createDatabaseContent() {
  let connection;

  const userAmount = 100;
  const postAmount = 200;
  const voteAmount = 3000;

  const [insertUserQueryString, insertPostQueryString, insertVoteQueryString] =
    createTestContentQueries(userAmount, postAmount, voteAmount);

  try {
    connection = await getDB();

    await connection.query(insertUserQueryString);
    await connection.query(insertPostQueryString);
    await connection.query(insertVoteQueryString);

    console.log('Content added to database.');
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();

    process.exit();
  }
}
createDatabaseContent();
