'use strict';

const path = require('path');
const sharp = require('sharp');
const fs = require('fs/promises');
const { UPLOADS_DIR } = process.env;
const { faker } = require('@faker-js/faker');

/**
 * Throws an error with a custom message and code.
 *
 * @param {string} msg - Error message.
 * @param {number} code - Error code.
 * @returns {void}
 * @example generateError('User not found', 404)
 *
 */
const generateError = (msg, code) => {
  const err = new Error(msg);
  err.statusCode = code;
  throw err;
};

/**
 *  Saves an image to the server.
 * @param {object} img
 * @param {string} imgName
 * @returns {void}
 * @example saveAvatar(req.files.avatar, req.body.username)
 */
const saveAvatar = async (img, imgName) => {
  const uploadsPath = path.join(__dirname, UPLOADS_DIR);
  const imgPath = path.join(uploadsPath, imgName);

  try {
    await fs.access(uploadsPath);
  } catch {
    await fs.mkdir(uploadsPath);
  }

  const sharpImg = sharp(img.data);

  sharpImg.resize(500);

  console.log(imgPath);
  await sharpImg.toFile(imgPath);
};

/**
 * Gets the path of an image.
 * @param {string} imgName
 * @returns {string} imgPath
 * @example getPath('avatar.png')
 * @returns '/home/user/.../backend-node/uploads/avatar.png'
 *
 */
const getPath = async (imgName) => {
  const imgPath = path.join(__dirname, UPLOADS_DIR, imgName);

  return imgPath;
};

/**
 * Deletes an image from the server.
 * @param {string} imgName
 * @example deleteAvatar('avatar.png')
 * @returns {void}
 * @throws {Error} If the image is not found.
 */
const deleteAvatar = async (imgName) => {
  const imgPath = path.join(__dirname, UPLOADS_DIR, imgName);

  try {
    await fs.access(imgPath);
  } catch (err) {
    generateError('Avatar not found', 404);
  }

  await fs.unlink(imgPath);
};

/**
 * Creates an array with the data to anonymize a user.
 *
 * @param {number} userId - Id of the user.
 *
 * @returns {array} - Array with the data to anonymize a user.
 *
 * @example createAnonymizedData(1)
 */
const createAnonymizedData = (userId) => {
  const paramArray = [
    `DeletedUser${userId}`,
    `${Math.random()}`,
    `${userId}@deleted.com`,
    new Date(),
    userId,
  ];
  return paramArray;
};

/**
 * Returns the query string to update the avatar and saves or deletes the file accordingly.
 *
 * @param {string} value - Value of the avatar field.
 * @param {number} id - Id of the user.
 *
 * @returns {string} - Query string to update the avatar.
 *
 * @example getAvatarQueryAndHandleFile(req.files.avatar, req.body.username)
 * @returns ', avatar=1, avatar_name=1'
 */
const getAvatarQueryAndHandleFile = (value, id) => {
  let queryString = '';
  if (value === 'delete') {
    deleteAvatar(`${id}`);
    queryString += `, avatar=0, avatar_name=NULL`;
  } else if (value !== 'delete') {
    saveAvatar(value, `${id}`);
    queryString += `, avatar=1, avatar_name=${id}`;
  }
  return queryString;
};

/**
 * Returns the query strings to create random users, posts and votes.
 *
 * @param {number} userAmount - Amount of users to create.
 * @param {number} postAmount - Amount of posts to create.
 * @param {number} voteAmount - Amount of votes to create.
 *
 * @returns {array} - Array with the query strings to create random users, posts and votes.
 *
 * @example createTestContentQueries(10, 20, 30)
 */
const createTestContentQueries = (userAmount, postAmount, voteAmount) => {
  let insertUserQueryString = `INSERT INTO users (name, email, password) VALUES (`;
  let userCount = 0;
  let insertPostQueryString = `INSERT INTO posts (title, content, id_user) VALUES (`;
  let postCount = 0;
  let insertVoteQueryString = `INSERT INTO votes (value, id_user, id_post) VALUES (`;
  let voteCount = 0;

  while (userCount < userAmount) {
    console.log('Inserting users...');
    const name = faker.name.firstName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    if (
      insertUserQueryString.includes(name) ||
      insertUserQueryString.includes(email)
    ) {
      continue;
    }
    insertUserQueryString += `'${name}', '${email}', '${password}'), (`;
    userCount++;
  }

  insertUserQueryString = insertUserQueryString.slice(0, -3);

  while (postCount < postAmount) {
    console.log('Inserting posts...');
    const title = faker.lorem.sentence(3);
    const content = faker.lorem.paragraph(3);
    const id_user = Math.floor(Math.random() * userAmount) + 1;
    if (
      insertPostQueryString.includes(title) ||
      insertPostQueryString.includes(content)
    ) {
      continue;
    }
    insertPostQueryString += `'${title}', '${content}', '${id_user}'), (`;
    postCount++;
  }

  insertPostQueryString = insertPostQueryString.slice(0, -3);

  while (voteCount < voteAmount) {
    console.log('Inserting votes...');
    const likeValues = ['like', 'dislike'];
    const value = likeValues[Math.floor(Math.random() * likeValues.length)];
    const id_user = Math.floor(Math.random() * userAmount) + 1;
    const id_post = Math.floor(Math.random() * postAmount) + 1;
    if (insertVoteQueryString.includes(`'${id_user}', '${id_post}'`)) {
      continue;
    }
    insertVoteQueryString += `'${value}', '${id_user}', '${id_post}'), (`;
    voteCount++;
  }

  insertVoteQueryString = insertVoteQueryString.slice(0, -3);

  return [insertUserQueryString, insertPostQueryString, insertVoteQueryString];
};

module.exports = {
  getPath,
  deleteAvatar,
  saveAvatar,
  generateError,
  createAnonymizedData,
  getAvatarQueryAndHandleFile,
  createTestContentQueries,
};
