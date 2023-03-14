'use strict';

const insertUserQuery = require('../../bbdd/queries/users/insertUserQuery');

const { generateError } = require('../../helpers');

/**
 * Extracts the name, email and password from the request body and inserts it into the database. Responds with a message.
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
 * @example newUser({body: {name: 'Name', email: 'email', password: 'password'}}, res, next);
 * @returns {void}
 * @throws {Error} - If there is missing data.
 */
const newUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      generateError('There are empty fields.', 400);
    }

    const response = await insertUserQuery(name, email, password);
    if (response?.code) {
      res.send(response);
    }
    res.send({
      status: 'ok',
      message: 'User created.',
    });
  } catch (err) {
    console.log(err);
    if (err.errno === 1062) {
      err.message = 'The user already exists.';
      err.statusCode = 409;
    }
    next(err);
  }
};

module.exports = newUser;
