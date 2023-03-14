'use strict';

const selectPostByIdQuery = require('../../bbdd/queries/posts/selectPostByIdQuery');

/**
 * Extracts the id from the request params and the user id from the request user and sends the post data.
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
 * @example getPost({params: {id: 1} user: {id: 1}}, res, next);
 * @throws {Error} - If there is an error.
 */
const getPost = async (req, res, next) => {
  const userId = req.user?.id;

  try {
    const { id } = req.params;

    const post = await selectPostByIdQuery(id, userId);

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
