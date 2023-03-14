'use strict';

const anonymizeUserQuery = require('../../bbdd/queries/users/anonymizeUserQuery');

/**
 * Anonymizes a user in the database by changing its name, email and password. Responds with a message.
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
 * @example anonymizeUser(req, res, next)
 * @returns {void}
 * @throws {Error} - If there is an error.
 */
const anonymizeUser = async (req, res, next) => {
  try {
    await anonymizeUserQuery(req.user.id);

    res.setHeader('token', null);
    res.send({
      status: 'ok',
      data: {
        message: 'User deleted.',
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = anonymizeUser;
