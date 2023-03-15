'use strict';

const selectUserByIdQuery = require('../../bbdd/queries/users/selectUserByIdQuery');

/**
 * Sends the user data.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is an error.
 *
 * @example getUserById({params: {id: 1} user: {id: 1}}, res, next);
 */
const getUserById = async (req, res, next) => {
  const { id: idOfRequestedUser } = req.params;
  const idOfRequestingUser = req.user?.id;

  try {
    const user = await selectUserByIdQuery(
      idOfRequestedUser,
      idOfRequestingUser
    );

    res.send({
      status: 'ok',
      data: {
        message: 'User data.',
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getUserById;
