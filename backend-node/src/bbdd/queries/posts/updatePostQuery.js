'use strict';

const getDB = require('../../getConnection');
const { generateError } = require('../../../helpers');

/**
 * Updates the post data in the database. The user can update any number of fields. Returns the updated data.
 *
 * @param {object} dataToUpdate - Data to update.
 * @param {number} postID - Id of the post.
 * @param {number} user - Id of the user.
 *
 * @returns {object} - Updated data.
 *
 * @example updatePostQuery({title: 'New title', content: 'New content'}, 1, 1);
 *
 * @throws {Error} - If there is an error or if all fields are empty.
 */
const updatePostQuery = async (dataToUpdate, postID) => {
  let connection;

  try {
    connection = await getDB();

    let queryString = 'modifiedAt=?';
    let queryArray = [new Date()];

    Object.entries(dataToUpdate)
      .sort()
      .forEach(([key, value]) => {
        queryString += `, ${key}=?`;
        queryArray.push(value);
      });

    queryArray.push(postID);

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
