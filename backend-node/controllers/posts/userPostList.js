'use strict';

const selectUserPostQuery = require('../../bbdd/queries/posts/selectUserPostQuery');

const userPostList = async (req, res, next) => {
  const id = req.user?.id;
  try {
    // Lista de posts.
    const posts = await selectUserPostQuery(id);

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

module.exports = userPostList;
