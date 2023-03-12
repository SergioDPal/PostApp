'use strict';

const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');

const ensureToken = async (req, res, next) => {
  handleRequest(req, next, true);
};

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
      generateError('Necesitas estar logado', 403);
    }
  } catch {
    return null;
  }
};

module.exports = { getTokenIdOptional, ensureToken };
