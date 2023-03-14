'use strict';

const selectUserPostQuery = require('../../bbdd/queries/posts/selectUserPostQuery');

/**
 * Extracts the id from the request user and the offset from the request headers and sends a list of 10 posts from the user with that id.
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
 * @example
 * userPostList(req, res, next);
 * @throws {Error} - If there is an error.
 */
const userPostList = async (req, res, next) => {
  const id = req.user?.id;
  const offset = Number(req.headers.offset) ? Number(req.headers.offset) : 0;

  try {
    const posts = await selectUserPostQuery(id, offset);

    res.send({
      status: 'ok',
      data: {
        message: 'User posts list.',
        posts,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = userPostList;
