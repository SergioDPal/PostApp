"use strict";

const getDB = require("../bbdd/getConnection");
const bcrypt = require("bcrypt");
const {generateError} = require("../helpers");
const {log} = require("console");

/**
 * Checks if the password is correct.
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {function} next - Next function.
 * @returns {void}
 * @example isPassCorrect(req, res, next)
 * @returns {void}
 * @throws {Error} - If the password is not correct.
 */
const isPassCorrect = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const tokenId = req.user.id;

    const [user] = await connection.query(
      `SELECT password FROM users WHERE id = ?`,
      [tokenId]
    );

    const dbPassword = user[0].password;

    const {oldPwd} = req.body;
    Object.entries(req.body).forEach(([key, value]) => {});

    const validPass = await bcrypt.compare(oldPwd, dbPassword);

    if (!validPass) {
      generateError("Incorrect password.", 401);
    }

    next();
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = isPassCorrect;
