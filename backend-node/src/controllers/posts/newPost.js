'use strict';

const insertPostQuery = require('../../bbdd/queries/posts/insertPostQuery');
const { generateError } = require('../../helpers');

/**
 * Saves a new post into the database.
 *
 * @param {object} req - Request object. It must have a body with the title and content of the post.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is an error.
 *
 * @example newPost({body: {title: 'Title', content: 'Content'}}, res, next);
 */
const newPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      generateError('One or more of the fields are empty.', 400);
    }

    const response = await insertPostQuery(title, content, userId);
    if (response?.code) {
      res.send(response);
    } else {
      res.send({
        status: 'ok',
        message: 'Post created.',
        response,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = newPost;
