'use strict';

const insertVoteQuery = require('../../bbdd/queries/votes/insertVoteQuery');

const vote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    // Insertamos el nuevo post.
    const vote = await insertVoteQuery(value, id, req.user.id);

    res.send({
      status: 'ok',
      message: 'voto creado',
      data: vote,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = vote;
