'use strict';

const { ensureToken, getTokenIdOptional } = require('./getAuthData');
const isPassCorrect = require('./isPassCorrect');
const isPostAuthor = require('./isPostAuthor');

module.exports = {
    isPostAuthor,
    isPassCorrect,
    ensureToken,
    getTokenIdOptional,
};
