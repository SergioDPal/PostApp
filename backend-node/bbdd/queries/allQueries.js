const deleteVotesFromPostQuery = `
DELETE FROM 
  votes 
WHERE 
  id_post = ?
`;

const deletePostQuery = `
DELETE FROM 
  posts 
WHERE 
  id = ?
`;

const allPostsQueryWithId = `
SELECT 
p.id, 
p.createdAt, 
p.title, 
p.content, 
u.name AS user_name, 
u.status AS user_status, 
p.id_user, 
(
  SELECT 
    COUNT(*) 
  FROM 
    votes 
  WHERE 
    value = 'like' 
    AND id_post = p.id
) - (
  SELECT 
    COUNT(*) 
  FROM 
    votes 
  WHERE 
    value = 'dislike' 
    AND id_post = p.id
) AS likes, 
(
  SELECT 
    value 
  FROM 
    votes 
  WHERE 
    id_post = p.id 
    AND id_user = ?
) AS like_by_user 
FROM 
posts AS p 
LEFT JOIN users AS u ON (u.id = p.id_user) 
LEFT JOIN votes AS v ON (v.id_post = p.id) 
GROUP BY 
p.id 
ORDER BY 
p.id DESC 
LIMIT 
10 OFFSET ?
`;

const allPostsQueryWithoutId = `
SELECT 
p.id, 
p.createdAt, 
p.title, 
p.content, 
u.name AS user_name, 
u.status AS user_status, 
p.id_user, 
(
  SELECT 
    COUNT(*) 
  FROM 
    votes 
  WHERE 
    value = 'like' 
    AND id_post = p.id
) - (
  SELECT 
    COUNT(*) 
  FROM 
    votes 
  WHERE 
    value = 'dislike' 
    AND id_post = p.id
) AS likes 
FROM 
posts AS p 
LEFT JOIN users AS u ON (u.id = p.id_user) 
LEFT JOIN votes AS v ON (v.id_post = p.id) 
GROUP BY 
p.id 
ORDER BY 
p.id DESC 
LIMIT 
10 OFFSET ?
`;

const postByIdQuery = `
SELECT 
p.id, 
p.createdAt, 
p.title, 
p.content, 
u.name AS user_name, 
u.status AS user_status, 
p.id_user, 
(
  SELECT 
    COUNT(*) 
  FROM 
    votes 
  WHERE 
    value = 'like' 
    AND id_post = p.id
) - (
  SELECT 
    COUNT(*) 
  FROM 
    votes 
  WHERE 
    value = 'dislike' 
    AND id_post = p.id
) AS likes, 
(
  SELECT 
    value 
  FROM 
    votes 
  WHERE 
    id_post = p.id 
    AND id_user = ?
) AS like_by_user 
FROM 
posts AS p 
LEFT JOIN users AS u ON (u.id = p.id_user) 
LEFT JOIN votes AS v ON (v.id_post = p.id) 
WHERE 
p.id = ? 
GROUP BY 
p.id 
ORDER BY 
p.createdAt DESC
`;

const userPostQuery = `
SELECT 
p.id, 
p.createdAt, 
p.title, 
p.content, 
u.name AS user_name, 
u.status AS user_status, 
p.id_user, 
(
  SELECT 
    COUNT(*) 
  FROM 
    votes 
  WHERE 
    value = 'like' 
    AND id_post = p.id
) - (
  SELECT 
    COUNT(*) 
  FROM 
    votes 
  WHERE 
    value = 'dislike' 
    AND id_post = p.id
) AS likes, 
(
  SELECT 
    value 
  FROM 
    votes 
  WHERE 
    id_post = p.id 
    AND id_user = ?
) AS like_by_user 
FROM 
posts AS p 
LEFT JOIN users AS u ON (u.id = p.id_user) 
LEFT JOIN votes AS v ON (v.id_post = p.id) 
WHERE 
p.id_user = ? 
GROUP BY 
p.id 
ORDER BY 
p.id DESC 
LIMIT 
10 OFFSET ?
`;

const anonymizeUserQuery = `
UPDATE 
users 
SET 
status = 'deleted', 
name = ?, 
password = ?, 
email = ?, 
modifiedAt = ? 
WHERE 
id = ?`;

const insertUserQuery = `
INSERT INTO users (name, email, password) 
VALUES 
  (?, ?, ?)
`;

const selectUserByEmailQuery = `
SELECT 
id, 
name, 
email, 
password, 
createdAt, 
avatar 
FROM 
users 
WHERE 
email = ?
`;

const selectUserByIdWithEmailQuery = `
SELECT 
u.id, 
u.status, 
u.name, 
u.email, 
u.createdAt, 
u.avatar, 
u.avatar_name, 
(
  SELECT 
    COUNT(*) 
  FROM 
    posts 
  WHERE 
    id_user = ?
) AS postcount 
FROM 
users AS u 
LEFT JOIN posts AS p ON (p.id_user = u.id) 
WHERE 
u.id = ? 
GROUP BY 
u.id;
`;

const selectUserByIdWithoutemailQuery = `
SELECT 
u.id, 
u.status, 
u.name, 
u.createdAt, 
u.avatar, 
u.avatar_name, 
(
  SELECT 
    COUNT(*) 
  FROM 
    posts 
  WHERE 
    id_user = ?
) AS postcount 
FROM 
users AS u 
LEFT JOIN posts AS p ON (p.id_user = u.id) 
WHERE 
u.id = ? 
GROUP BY 
u.id;
`;

const deleteVoteQuery = `
DELETE FROM 
  votes 
WHERE 
  id_post = ? 
  AND id_user = ?
`;

const selectVoteQuery = `
SELECT 
  value 
FROM 
  votes 
WHERE 
  id_post = ? 
  AND id_user = ?
`;

const insertVoteQuery = `
INSERT INTO votes (value, id_post, id_user) 
VALUES 
  (?, ?, ?)
`;

const updateVoteQuery = `
UPDATE 
  votes 
SET 
  value = ? 
WHERE 
  id_post = ? 
  AND id_user = ?
`;
module.exports = {
  allPostsQueryWithId,
  allPostsQueryWithoutId,
  postByIdQuery,
  userPostQuery,
  anonymizeUserQuery,
  insertUserQuery,
  selectUserByEmailQuery,
  selectUserByIdWithEmailQuery,
  selectUserByIdWithoutemailQuery,
  deleteVotesFromPostQuery,
  deletePostQuery,
  deleteVoteQuery,
  selectVoteQuery,
  insertVoteQuery,
  updateVoteQuery,
};
