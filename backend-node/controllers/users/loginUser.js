'use strict';

const selectUserByEmailQuery = require('../../bbdd/queries/users/selectUserByEmailQuery');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {
  try {
    // Obtenemos los datos del body.
    const { email, password } = req.body;

    // Si faltan campos lanzamos un error.
    if (!email || !password) {
      generateError('Faltan campos', 400);
    }

    // Localizamos al usuario con el email del body.
    const user = await selectUserByEmailQuery(email);

    // Comprobamos si las contraseñas coinciden.
    const validPass = await bcrypt.compare(password, user.password);

    // Si la contraseña es incorrecta lanzamos un error.
    if (!validPass) {
      generateError('Contraseña incorrecta', 401);
    }

    // Objeto con información que queremos agregar al token.
    const tokenInfo = {
      id: user.id,
      name: user.name,
    };

    // Creamos el token.
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: '7d',
    });
    res.cookie('token', token);
    res.setHeader('token', token);
    res.send({
      status: 'ok',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        avatar: user.avatar,
        message: 'Usuario logueado',
        token: token,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUser;
