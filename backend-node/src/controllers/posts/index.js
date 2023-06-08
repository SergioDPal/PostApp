'use strict';

const newPost = require('./newPost');
const postList = require('./postList');
const getPost = require('./getPost');
const editPost = require('./editPost');
const deletePost = require('./deletePost');
const userPostList = require('./userPostList');

module.exports = {
  newPost,
  postList,
  getPost,
  editPost,
  deletePost,
  userPostList,
};
