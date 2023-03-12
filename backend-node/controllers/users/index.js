'use strict';

const newUser = require('./newUser');
const loginUser = require('./loginUser');
const getUserById = require('./getUserById');
const editUser = require('./editUser');
const deleteUser = require('./deleteUser');

module.exports = {
    deleteUser,
    newUser,
    loginUser,
    getUserById,
    editUser,
};
