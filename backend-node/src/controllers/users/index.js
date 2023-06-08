'use strict';

const newUser = require('./newUser');
const loginUser = require('./loginUser');
const getUserById = require('./getUserById');
const editUser = require('./editUser');
const anonymizeUser = require('./anonymizeUser');

module.exports = {
  anonymizeUser,
  newUser,
  loginUser,
  getUserById,
  editUser,
};
