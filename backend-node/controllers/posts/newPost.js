'use strict';

const insertPostQuery = require('../../bbdd/queries/posts/insertPostQuery');
const { generateError } = require('../../helpers');

const newPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const tokenId = req.user.id;

    if (!title || !content) {
      generateError('Faltan campos', 400);
    }

    const response = await insertPostQuery(title, content, tokenId);
    if (response?.code) {
      res.send(response);
    } else {
      res.send({
        status: 'ok',
        message: 'Post creado',
        response,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = newPost;
