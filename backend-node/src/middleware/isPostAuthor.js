'use strict';

const { generateError } = require('../helpers');
const getDB = require('../bbdd/getConnection');

/**
 * Executes a function with a connection to the database.
 * @param {function} callback - Function to execute with the connection.
 * @param {function} onError - Function to execute if there is an error.
 * @returns {void}
 * @example withConnection(async (connection) => { ... }, (error) => { ... })
 */
const withConnection = async (callback, onError) => {
  let connection;
  try {
    connection = await getDB();
    callback(connection);
  } catch (err) {
    onError(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

/**
 * Checks if the user is the author of the post.
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
 * @example isPostAuthor(req, res, next)
 * @returns {void}
 * @throws {Error} - If the user is not the author of the post.
 */
const isPostAuthor = async (req, res, next) => {
  withConnection(
    async (connection) => {
      const tokenId = req.user.id;

      const { id: postId } = req.params;

      const [postUserId] = await connection.query(
        `
                SELECT id_user FROM posts
                WHERE id=?
                `,
        postId
      );

      if (postUserId[0].id_user !== tokenId)
        generateError(`You can't edit this post.`, 403);

      next();
    },
    (error) => {
      next(error);
    }
  );
};

module.exports = isPostAuthor;
