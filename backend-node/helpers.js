'use strict';

const path = require('path');
const sharp = require('sharp');
const fs = require('fs/promises');
const { UPLOADS_DIR } = process.env;

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

module.exports = {
  getPath,
  deleteAvatar,
  saveAvatar,
  generateError,
};
