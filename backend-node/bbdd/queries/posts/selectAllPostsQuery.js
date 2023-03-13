'use strict';

const getDB = require('../../getConnection');
const { generateError } = require('../../../helpers');

const selectAllPostsQuery = async (userId, offset) => {
  let connection;
  const queryWithId = `SELECT p.id, p.createdAt, p.title, p.content, u.name, u.status,  p.id_user,
  (SELECT COUNT(*) FROM votes WHERE value = 'like' AND id_post = p.id) 
  - (SELECT COUNT(*) FROM votes WHERE value = 'dislike' AND id_post = p.id) AS likes,
  (SELECT value FROM votes WHERE id_post = p.id AND id_user = ?) AS like_by_user
  FROM posts AS p
  LEFT JOIN users AS u ON (u.id = p.id_user)
  LEFT JOIN votes AS v ON (v.id_post = p.id)
  GROUP BY p.id
  ORDER BY p.id DESC LIMIT 10 OFFSET ?`;

  const queryWithoutId = `SELECT p.id, p.createdAt, p.title, p.content, u.name, u.status,  p.id_user,
  (SELECT COUNT(*) FROM votes WHERE value = 'like' AND id_post = p.id) 
  - (SELECT COUNT(*) FROM votes WHERE value = 'dislike' AND id_post = p.id) AS likes
  FROM posts AS p
  LEFT JOIN users AS u ON (u.id = p.id_user)
  LEFT JOIN votes AS v ON (v.id_post = p.id)
  GROUP BY p.id
  ORDER BY p.id DESC LIMIT 10 OFFSET ?`;

  try {
    connection = await getDB();

    const [posts] = await connection.query(
      userId ? queryWithId : queryWithoutId,
      userId ? [userId, offset] : [offset]
    );
    if (posts.length < 1) {
      generateError('Post no encontrado', 404);
    }
    const checkedPosts = posts.map((post) => {
      if (post.status === 'deleted') {
        post.name = 'Usuario eliminado';
      }
      delete post.status;
      return post;
    });
    return checkedPosts;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllPostsQuery;
