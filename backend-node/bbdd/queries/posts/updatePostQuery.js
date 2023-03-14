'use strict';

const getDB = require('../../getConnection');
const { generateError } = require('../../../helpers');

/**
 * Updates the post data in the database.
 * @param {object} dataToUpdate - Data to update.
 * @param {number} postID - Id of the post.
 * @param {number} user - Id of the user.
 * @returns {object} - Updated data.
 * @example updatePostQuery({title: 'New title', content: 'New content'}, 1, 1);
 * @throws {Error} - If there is an error.
 * @throws {Error} - If there all fields are empty.
 */
const updatePostQuery = async (dataToUpdate, postID, user) => {
  let connection;

  try {
    connection = await getDB();

    const { title, content } = dataToUpdate;

    const bodyNames = Object.keys(dataToUpdate).sort();
    let queryString = 'modifiedAt=?';
    let queryArray = [new Date()];
    for (const entry of bodyNames) {
      if (entry === 'title' || entry === 'content') {
        queryString += `, ${entry}=?`;
      }
      if (entry === 'title') queryArray.push(title);
      if (entry === 'content') queryArray.push(content);
    }
    queryString += `, id_user = ?`;
    queryArray.push(user, postID);

    await connection.query(
      `
            UPDATE posts
            SET ${queryString}
            WHERE id=?
            `,
      queryArray
    );

    return dataToUpdate;
  } catch (error) {
    generateError('Unexpected error during the request.', 500);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updatePostQuery;
