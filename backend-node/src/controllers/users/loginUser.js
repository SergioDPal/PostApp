'use strict';

const selectUserByEmailQuery = require('../../bbdd/queries/users/selectUserByEmailQuery');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { generateError } = require('../../helpers');

/**
 * Generates a token and sends it along with the user data if the credentials are correct.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 *
 * @returns {void}
 *
 * @throws {Error} - If the password is incorrect or there is missing data.
 *
 * @example loginUser({body: {email: 'email', password: 'password'}}, res, next);
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      generateError('One or more fields are empty.', 400);
    }

    const user = await selectUserByEmailQuery(email);

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      generateError('Incorrect password.', 401);
    }

    const tokenInfo = {
      id: user.id,
      name: user.name,
    };

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
        message: 'User logged in.',
        token: token,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUser;
