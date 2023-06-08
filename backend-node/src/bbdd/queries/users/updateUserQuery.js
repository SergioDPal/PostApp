"use strict";

const getDB = require("../../getConnection");
const bcrypt = require("bcrypt");
const {getAvatarQueryAndHandleFile} = require("../../../helpers");

/**
 * Edits the user data in the database.
 *
 * @param {object} data - Object with the data to update.
 *
 * @returns {void}
 *
 * @throws {Error} - If there is an error.
 *
 * @example updateUserQuery({ name: 'name', email: 'email', password: 'password', avatar: 'avatar', id: 1})
 */
const updateUserQuery = async (data) => {
  let connection;

  try {
    connection = await getDB();
    const {id} = data;
    let hashedPass;
    let queryString = "modifiedAt=?";
    let queryArray = [new Date()];

    Object.entries(data).forEach(([key, value]) => {
      if (key === "password") {
        hashedPass = bcrypt.hashSync(value, 10);
        queryString += `, password='${hashedPass}'`;
      } else if (key === "avatar") {
        queryString += getAvatarQueryAndHandleFile(value, id);
      } else if (key !== "avatar" && key !== "id" && key !== "password") {
        queryString += `, ${key}=?`;
        queryArray.push(value);
      }
    });

    queryArray.push(id);

    await connection.query(
      `
        UPDATE users
        SET ${queryString}
        WHERE id=?
        `,
      queryArray
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = updateUserQuery;
