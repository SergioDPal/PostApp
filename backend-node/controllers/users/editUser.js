'use strict';

const updateUserQuery = require('../../bbdd/queries/users/updateUserQuery');

/**
 * Extracts the data from the request body and updates the user in the database. Responds with a message. The user can update any number of fields.
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
 * @example editUser(req, res, next)
 * @returns {void}
 * @throws {Error} - If there is an error.
 * @throws {Error} - If there is no data.
 */
const editUser = async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  const data = {};

  const { id } = req.user;

  name && (data.name = name);
  email && (data.email = email);
  password && (data.password = password);
  req.files
    ? (data.avatar = req.files.avatar)
    : avatar && (data.avatar = avatar);
  id && (data.id = id);

  if (!name && !email && !password && !data.avatar) {
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
