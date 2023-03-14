'use strict';

const insertVoteQuery = require('../../bbdd/queries/votes/insertVoteQuery');

/**
 * Extracts the id of the post from the params and the value of the vote from the request body and inserts it into the database. Responds with the value of the vote.
 * If the vote already exists, it will be updated.
 * @param {object} req - Request object. It must have a body with the value of the vote.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
 * @example vote({params: {id: 1}, body: {value: 'like'}}, res, next);
 * @returns {void}
 * @throws {Error} - If there is an error.
 */
const vote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const vote = await insertVoteQuery(value, id, req.user.id);

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
