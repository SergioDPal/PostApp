'use strict';

const selectPostByIdQuery = require('../../bbdd/queries/posts/selectPostByIdQuery');

/**
 * Sends the post data.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is an error.
 *
 * @example getPost({params: {id: 1} user: {id: 1}}, res, next);
 */
const getPost = async (req, res, next) => {
  const userId = req.user?.id;

  try {
    const { id: postId } = req.params;

    const post = await selectPostByIdQuery(postId, userId);

    res.send({
      status: 'ok',
      data: {
        message: 'Post data.',
        post,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getPost;
