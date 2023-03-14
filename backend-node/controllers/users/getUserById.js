'use strict';

const selectUserByIdQuery = require('../../bbdd/queries/users/selectUserByIdQuery');

/**
 * Extracts the id from the request params and the user id from the request user and sends the user data.
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
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
