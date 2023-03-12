'use strict';

const jwt = require('jsonwebtoken');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs/promises');
const { UPLOADS_DIR } = process.env;

/**
 * ####################
 * ## Generate Error ##
 * ####################
 */

const generateError = (msg, code) => {
  const err = new Error(msg); // mensaje de error
  err.statusCode = code; // codigo de error
  throw err;
};

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

const getPath = async (imgName) => {
  const imgPath = path.join(__dirname, UPLOADS_DIR, imgName);

  return imgPath;
};

const getTokenValue = async (token) => {
  try {
    const tokenValue = jwt.verify(token, process.env.SECRET).id;
    return tokenValue;
  } catch (err) {
    const tokenValue = 'No token';
    return tokenValue;
  }
};

const deleteAvatar = async (imgName) => {
  const imgPath = path.join(__dirname, UPLOADS_DIR, imgName);

  try {
    await fs.access(imgPath);
  } catch {
    return;
  }

  await fs.unlink(imgPath);
};

module.exports = {
  getPath,
  deleteAvatar,
  saveAvatar,
  generateError,
  getTokenValue,
};
