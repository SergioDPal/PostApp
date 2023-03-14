'use strict';

const getDB = require('../../getConnection');
const { generateError } = require('../../../helpers');

/**
 * Selects a user's array of posts by its id.
 * @param {number} id - Id of the user.
 * @param {number} offset - Offset of the posts.
 * @returns {object} - Object with the user's posts data.
 * @example selectUserPostQuery(2,20)
 * @throws {Error} - If the user or the post is not found.
 */
const selectUserPostQuery = async (id, offset) => {
  let connection;

  try {
    connection = await getDB();
    const [posts] = await connection.query(
      `SELECT p.id, p.createdAt, p.title, p.content, u.name, u.status, p.id_user,
			(SELECT COUNT(*) FROM votes WHERE value = 'like' AND id_post = p.id) 
            - (SELECT COUNT(*) FROM votes WHERE value = 'dislike' AND id_post = p.id) AS likes,
            (SELECT value FROM votes WHERE id_post = p.id AND id_user = ?) AS like_by_user
            FROM posts AS p
            LEFT JOIN users AS u ON (u.id = p.id_user)
            LEFT JOIN votes AS v ON (v.id_post = p.id)
            WHERE p.id_user = ?
            GROUP BY p.id
            ORDER BY p.id DESC LIMIT 10 OFFSET ?`,
      [id, id, offset]
    );
    if (posts.length < 1) {
      generateError('Post no encontrado', 404);
    }
    const checkedPosts = posts.map((post) => {
      if (post.status === 'deleted') {
        post.name = 'Deleted user';
      }
      delete post.status;
      return post;
    });
    return checkedPosts;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserPostQuery;
