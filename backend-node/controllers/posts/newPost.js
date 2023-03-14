'use strict';

const insertPostQuery = require('../../bbdd/queries/posts/insertPostQuery');
const { generateError } = require('../../helpers');

/**
 * Extracts the post data from the request body and inserts it into the database. Responds with a message.
 * @param {object} req - Request object. It must have a body with the title and content of the post.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
 * @example
 * newPost({body: {title: 'Title', content: 'Content'}}, res, next);
 * @throws {Error} - If there is an error.
 */
const newPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const tokenId = req.user.id;

    if (!title || !content) {
      generateError('One or more of the fields are empty.', 400);
    }

    const response = await insertPostQuery(title, content, tokenId);
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
