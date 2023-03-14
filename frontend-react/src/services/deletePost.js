import { throwError } from '../helpers';

/**
 * Deletes the post data in the database.
 * @param {number} postId - Id of the post.
 * @param {string} token - Token of the user.
 * @returns {object} - Response of the request.
 * @example deletePost(1, 'token');
 * @throws {Error} - If there is an error.
 */
const deletePost = async (postId, token) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: token },
  };
  const resVote = await fetch(
    `${process.env.REACT_APP_HOST}/post/${postId}`,
    requestOptions
  );

  const bodyVote = await resVote.json();
  if (resVote.ok) {
    return resVote;
  } else {
    throwError(resVote.status, bodyVote.message);
  }
};

export { deletePost };
