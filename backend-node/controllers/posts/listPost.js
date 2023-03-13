'use strict';

const selectAllPostsQuery = require('../../bbdd/queries/posts/selectAllPostsQuery');

const listPost = async (req, res, next) => {
  const userId = req.user?.id;
  const offset = Number(req.headers.offset) ? Number(req.headers.offset) : 0;

  try {
    // Lista de posts.
    const posts = await selectAllPostsQuery(userId, offset);

    res.send({
      status: 'ok',
      data: {
        message: 'lista post',
        posts,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listPost;
