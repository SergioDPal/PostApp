'use strict';

const selectAllPostsQuery = require('../../bbdd/queries/posts/selectAllPostsQuery');

/**
 * Sends a list of the next 10 posts from the offset.
 *
 * If the user is logged in, it will return the value of the vote of the user.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is an error.
 *
 * @example postList({headers: {offset: 0}}, res, next);
 */
const postList = async (req, res, next) => {
  const userId = req.user?.id;
  const offset = Number(req.headers.offset) ? Number(req.headers.offset) : 0;

  try {
    const posts = await selectAllPostsQuery(userId, offset);

    res.send({
      status: 'ok',
      data: {
        message: 'Posts list.',
        posts,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = postList;
