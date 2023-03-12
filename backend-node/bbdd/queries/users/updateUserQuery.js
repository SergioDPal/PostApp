'use strict';

const getDB = require('../../getConnection');
const bcrypt = require('bcrypt');
const { deleteAvatar, saveAvatar } = require('../../../helpers');

const updateUserQuery = async (data) => {
  let connection;

  try {
    connection = await getDB();

    const { name, email, password, avatar, id } = data;

    const bodyNames = Object.keys(data).sort();

    let hashedPass;
    if (password) hashedPass = await bcrypt.hash(password, 10);

    let queryString = 'modifiedAt=?';
    let queryArray = [new Date()];
    for (const entry of bodyNames) {
      if (entry === 'name' || entry === 'email' || entry === 'password') {
        queryString += `, ${entry}=?`;
      }
      if (entry === 'avatar') {
        if (avatar === 'delete') {
          await deleteAvatar(`${id}`);
          await connection.query(
            `UPDATE users SET avatar=0, avatar_name=NULL WHERE id=?`,
            [id]
          );
        } else {
          await saveAvatar(avatar, `${id}`);
          queryString += `, avatar=1`;
          queryString += `, avatar_name=${id}`;
        }
      }
      if (entry === 'name') queryArray.push(name);
      if (entry === 'email') queryArray.push(email);
      if (entry === 'password' && hashedPass) queryArray.push(hashedPass);
    }
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
