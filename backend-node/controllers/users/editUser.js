'use strict';

const updateUserQuery = require('../../bbdd/queries/users/updateUserQuery');
/* const { generateError } = require('../../helpers');
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
        errorcode: 123,
        message: 'No se ha introducido ningún dato',
      },
    });
  }

  try {
    await updateUserQuery(data);

    res.send({
      status: 'ok',
      data: {
        message: 'datos usuario actualizados',
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUser;
