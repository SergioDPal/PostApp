'use strict';

const updateUserQuery = require('../../bbdd/queries/users/updateUserQuery');

/**
 * Updates the user in the database. The user can update any number of fields.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is no data.
 *
 * @example editUser({body: {name: 'String', email: 'String', password: 'String', avatar: object/string}, user: {id: 1}}, res, next);
 */
const editUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const { id } = req.user;
  const avatar = req.files ? req.files.avatar : req.body.avatar;
  const data = {};

  Object.entries({ name, email, password, id, avatar }).forEach(
    ([key, value]) => {
      if (value) {
        data[key] = value;
      }
    }
  );

  if ([name, email, password, avatar].every((value) => !value)) {
    res.status(200).send({
      data: {
        errorcode: 412,
        message: 'No data to update.',
      },
    });
  }

  try {
    await updateUserQuery(data);

    res.send({
      status: 'ok',
      data: {
        message: 'User updated.',
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUser;
