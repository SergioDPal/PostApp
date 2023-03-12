'use strict';

const { generateError } = require('../helpers');
const getDB = require('../bbdd/getConnection');

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
        generateError('No tienes permisos para editar este post', 403);

      next();
    },
    (error) => {
      next(error);
    }
  );
};

module.exports = isPostAuthor;
