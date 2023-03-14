'use strict';

require('dotenv').config();

const getDB = require('./getConnection');

// Function to create the database tables.
async function createDatabase() {
  let connection;

  try {
    connection = await getDB();

    console.log('Deleting tables...');

    await connection.query('DROP TABLE IF EXISTS votes');
    await connection.query('DROP TABLE IF EXISTS posts');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creating tables...');

    await connection.query(`
            CREATE TABLE users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                status VARCHAR(7) CHECK (status IN ('active','deleted')) DEFAULT 'active',
                name VARCHAR(100) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar BOOLEAN DEFAULT false,
                avatar_name VARCHAR(100),
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME
            )
        `);

    await connection.query(`
            CREATE TABLE posts (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(60) NOT NULL UNIQUE,
                content VARCHAR(500) NOT NULL,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  
                modifiedAt DATETIME,            
                id_user INT UNSIGNED NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users(id)
            )
        `);

    await connection.query(`
        CREATE TABLE votes (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,          
            value VARCHAR(7) CHECK (value IN ('like','dislike')),
            id_user INT UNSIGNED NOT NULL,
            FOREIGN KEY (id_user) REFERENCES users(id),
            id_post INT UNSIGNED NOT NULL,
            FOREIGN KEY (id_post) REFERENCES posts(id),
            CONSTRAINT user_vote_unique UNIQUE (id_user, id_post)

        )
    `);

    console.log('Tables created!');
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();

    process.exit();
  }
}

createDatabase();
