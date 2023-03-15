'use strict';

const selectUserPostQuery = require('../../bbdd/queries/posts/selectUserPostQuery');

/**
 * Sends a list of 10 posts from the offset posted by user with the given id.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is an error.
 *
 * @example userPostList({headers:{offset:0},user:{id:1}},res,next);
 */
const userPostList = async (req, res, next) => {
  const id = req.user.id;
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
