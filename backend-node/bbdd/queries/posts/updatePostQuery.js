'use strict';

const getDB = require('../../getConnection');
const { generateError } = require('../../../helpers');

const updateUserQuery = async (body, postID, user) => {
  let connection;

  try {
    connection = await getDB();

    const { title, content } = body;

    const bodyNames = Object.keys(body).sort();
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

    return body;
  } catch (error) {
    generateError('Error inesperado durante la solicitud', 500);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUserQuery;
