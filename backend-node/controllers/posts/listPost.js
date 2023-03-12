'use strict';

const selectAllPostsQuery = require('../../bbdd/queries/posts/selectAllPostsQuery');

const listPost = async (req, res, next) => {
  const userId = req.user?.id;

  try {
    // Lista de posts.
    const posts = await selectAllPostsQuery(userId);

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
