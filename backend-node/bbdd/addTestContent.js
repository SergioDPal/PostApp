'use strict';

require('dotenv').config();
const { faker } = require('@faker-js/faker');
const getDB = require('./getConnection');

async function createDatabaseContent() {
  let connection;
  let insertUserQueryString = `INSERT INTO users (name, email, password) VALUES (`;
  let insertPostQueryString = `INSERT INTO posts (title, content, id_user) VALUES (`;
  let insertVoteQueryString = `INSERT INTO votes (value, id_user, id_post) VALUES (`;

  for (let i = 0; i < 100; i++) {
    console.log('Insertando usuarios...');
    const name = faker.name.firstName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    if (
      insertUserQueryString.includes(name) ||
      insertUserQueryString.includes(email)
    ) {
      i--;
      continue;
    }
    insertUserQueryString += `'${name}', '${email}', '${password}'), (`;
  }
  insertUserQueryString = insertUserQueryString.slice(0, -3);

  for (let i = 0; i < 200; i++) {
    console.log('Insertando posts...');
    const title = faker.lorem.sentence(5);
    const content = faker.lorem.paragraph(3);
    const id_user = Math.floor(Math.random() * 25) + 1;
    if (
      insertPostQueryString.includes(title) ||
      insertPostQueryString.includes(content)
    ) {
      i--;
      continue;
    }
    insertPostQueryString += `'${title}', '${content}', '${id_user}'), (`;
  }
  insertPostQueryString = insertPostQueryString.slice(0, -3);

  for (let i = 0; i < 500; i++) {
    console.log('Insertando votos...');
    const likeValues = ['like', 'dislike'];
    const value = likeValues[Math.floor(Math.random() * likeValues.length)];
    const id_user = Math.floor(Math.random() * 25) + 1;
    const id_post = Math.floor(Math.random() * 50) + 1;
    if (insertVoteQueryString.includes(`'${id_user}', '${id_post}'`)) {
      i--;
      continue;
    }
    insertVoteQueryString += `'${value}', '${id_user}', '${id_post}'), (`;
  }
  insertVoteQueryString = insertVoteQueryString.slice(0, -3);

  try {
    connection = await getDB();

    await connection.query(insertUserQueryString);

    await connection.query(insertPostQueryString);

    await connection.query(insertVoteQueryString);

    console.log('¡Contenido creado!');
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();

    process.exit();
  }
}
createDatabaseContent();
