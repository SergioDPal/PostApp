'use strict';

const insertVoteQuery = require('../../bbdd/queries/votes/insertVoteQuery');

/**
 * Saves vote into the database.
 *
 * If the vote already exists, it will be updated.
 *
 * @param {object} req - Request object. It must have a body with the value of the vote.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is an error.
 *
 * @example vote({params: {id: 1}, body: {value: 'like'}}, res, next);
 */
const vote = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { value } = req.body;

    const vote = await insertVoteQuery(value, postId, req.user.id);

    res.send({
      status: 'ok',
      message: 'Vote added.',
      data: vote,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = vote;
