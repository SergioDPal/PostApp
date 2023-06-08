"use strict";

const path = require("path");
const sharp = require("sharp");
const fs = require("fs/promises");
const {UPLOADS_DIR} = process.env;
const {uploadImage} = require("./firebase/uploadImage");
const {deleteImage} = require("./firebase/deleteImage");

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
  const sharpImg = await sharp(img)
    .resize({width: 250, height: 250, fit: "cover"})
    .withMetadata();

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
    generateError("Avatar not found", 404);
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
  let queryString = "";
  if (value === "delete") {
    queryString += `, avatar=0, avatar_name=NULL`;
    deleteImage(`${id}`);
  } else if (value !== "delete") {
    queryString += `, avatar=1, avatar_name=${id}`;
    uploadImage({data: value, name: id});
  }
  return queryString;
};

module.exports = {
  getPath,
  deleteAvatar,
  saveAvatar,
  generateError,
  createAnonymizedData,
  getAvatarQueryAndHandleFile,
};
