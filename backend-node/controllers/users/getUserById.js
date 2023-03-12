'use strict';

const selectUserByIdQuery = require('../../bbdd/queries/users/selectUserByIdQuery');

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const tokenId = req.user?.id;
  try {
    // Obtenemos la información del usuario.
    const user = await selectUserByIdQuery(id, tokenId);

    res.send({
      status: 'ok',
      data: {
        message: 'datos usuario',
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getUserById;
