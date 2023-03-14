import { throwError } from '../helpers';

/**
 * Deletes the vote of the user in the database.
 * @param {number} postId - Id of the post.
 * @param {string} token - Token of the user.
 * @returns {object} - Response of the request.
 * @throws {Error} - If there is an error connecting to the database.
 */
const deleteVote = async (postId, token) => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const resVote = await fetch(
      `${process.env.REACT_APP_HOST}/post/${postId}/vote`,
      requestOptions
    );
    const bodyRes = await resVote.json();
    if (resVote.ok) {
      return bodyRes;
    } else {
      throwError(resVote.status, bodyRes.message);
    }
  } catch (err) {
    console.error(err);
  }
};

export { deleteVote };
