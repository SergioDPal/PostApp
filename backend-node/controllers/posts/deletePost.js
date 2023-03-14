'use strict';

const deletePostQuery = require('../../bbdd/queries/posts/deletePostQuery');

/**
 * Deletes the post from the database. The user can only delete his own posts. Responds with a message.
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
 * @example deletePost({params: {id: 1}}, res, next);
 * @throws {Error} - If there is an error.
 */
const deletePost = async (req, res, next) => {
  try {
    await deletePostQuery(req.params.id);

    res.send({
      status: 'ok',
      data: {
        message: 'Post deleted.',
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deletePost;
