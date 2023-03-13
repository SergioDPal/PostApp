'use strict';

const selectUserPostQuery = require('../../bbdd/queries/posts/selectUserPostQuery');

const userPostList = async (req, res, next) => {
  const id = req.user?.id;
  const offset = Number(req.headers.offset) ? Number(req.headers.offset) : 0;

  try {
    // Lista de posts.
    const posts = await selectUserPostQuery(id, offset);

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
