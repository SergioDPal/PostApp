'use strict';

const anonymizeUserQuery = require('../../bbdd/queries/users/anonymizeUserQuery');

const deleteUser = async (req, res, next) => {
  try {
    await anonymizeUserQuery(req.user.id);

    res.setHeader('token', null);
    res.send({
      status: 'ok',
      data: {
        message: 'Usuario eliminado',
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteUser;
