'use strict';

const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

/**
 * Gets the token id from the request and adds it to the request object.
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
 * @example getTokenIdOptional(req, res, next)
 * @returns {void}
 * @throws {Error} - If the token is not valid.
 */
const ensureToken = async (req, res, next) => {
  handleRequest(req, next, true);
};

/**
 * Gets the token id from the request and adds it to the request object.
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
 * @example getTokenIdOptional(req, res, next)
 * @returns {void}
 * Does not throw an error if the token is not valid.
 */
const getTokenIdOptional = async (req, res, next) => {
  handleRequest(req, next, false);
};

const handleRequest = (req, next, enforceToken) => {
  try {
    req.user = parseToken(req.headers.authorization, enforceToken);
    next();
  } catch (err) {
    next(err);
  }
};

const parseToken = (token, enforceToken) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.SECRET);
    } else if (enforceToken) {
      generateError('You need to be logged in.', 403);
    }
  } catch {
    return null;
  }
};

module.exports = { getTokenIdOptional, ensureToken };
