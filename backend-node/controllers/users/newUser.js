'use strict';

const insertUserQuery = require('../../bbdd/queries/users/insertUserQuery');

const { generateError } = require('../../helpers');

const newUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      generateError('Faltan campos', 400);
    }

    const response = await insertUserQuery(name, email, password);
    if (response?.code) {
      res.send(response);
    }
    res.send({
      status: 'ok',
      message: 'Usuario creado',
    });
  } catch (err) {
    console.log(err);
    if (err.errno === 1062) {
      err.message = 'Ya existe un usuario con esos datos';
      err.statusCode = 409;
    }
    next(err);
  }
};

module.exports = newUser;
