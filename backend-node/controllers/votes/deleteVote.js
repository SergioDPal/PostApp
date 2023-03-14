'use strict';

const deleteVoteQuery = require('../../bbdd/queries/votes/deleteVoteQuery');

/**
 * Extracts the id of the post from the params and the user id from the body and deletes it from the database. Responds with a message.
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
 * @example deleteVote({params: {id: 1} user: {id:1}}, res, next);
 * @returns {void}
 * @throws {Error} - If there is an error.
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
