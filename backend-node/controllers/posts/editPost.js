'use strict';

const updatePostQuery = require('../../bbdd/queries/posts/updatePostQuery');
const { generateError } = require('../../helpers');

const editPost = async (req, res, next) => {
  const { title, content } = req.body;

  try {
    if (!title && !content) {
      generateError('No se han introducido datos', 400);
    }

    const updatedData = await updatePostQuery(
      req.body,
      req.params.id,
      req.user.id
    );

    res.send({
      status: 'ok',
      message: 'datos post actualizados',
      data: updatedData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editPost;
