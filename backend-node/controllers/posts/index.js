'use strict';

const newPost = require('./newPost');
const listPost = require('./listPost');
const getPost = require('./getPost');
const editPost = require('./editPost');
const deletePost = require('./deletePost');
const userPostList = require('./userPostList');

module.exports = {
    newPost,
    listPost,
    getPost,
    editPost,
    deletePost,
    userPostList,
};
