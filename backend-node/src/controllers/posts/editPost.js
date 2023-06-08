'use strict';

const updatePostQuery = require('../../bbdd/queries/posts/updatePostQuery');
const { generateError } = require('../../helpers');

/**
 * Updates the post data in the database and sends the updated data. The user can update the title, the content or both.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 *
 * @returns {void}
 *
 * @throws {Error} - If there are empty fields.
 *
 * @example editPost({body: {title: 'New title', content: 'New content'}, params: {id: 1}, user: {id: 1}}, res, next);
 */
const editPost = async (req, res, next) => {
  const { title, content } = req.body;

  try {
    if (!title && !content) {
      generateError('The are empty fields.', 400);
    }

    const updatedData = await updatePostQuery(
      { title, content },
      req.params.id
    );

    res.send({
      status: 'ok',
      message: 'Post updated.',
      data: updatedData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editPost;
