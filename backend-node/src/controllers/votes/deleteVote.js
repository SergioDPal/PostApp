'use strict';

const deleteVoteQuery = require('../../bbdd/queries/votes/deleteVoteQuery');

/**
 * Deletes vote from the database.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is an error.
 *
 * @example deleteVote({params: {id: 1} user: {id:1}}, res, next);
 */
const deleteVote = async (req, res, next) => {
  try {
    const { id: postId } = req.params;

    await deleteVoteQuery(postId, req.user.id);

    res.send({
      status: 'ok',
      message: 'Vote deleted.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteVote;
