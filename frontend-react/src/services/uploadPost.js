import { throwError } from '../helpers';

/**
 * Uploads the post data to the database.
 * @param {string} title - Title of the post.
 * @param {string} content - Content of the post.
 * @param {string} token - Token of the user.
 * @returns {object} - Response of the request.
 * @example uploadPost('title', 'content', 'token');
 * @throws {Error} - If there is an error connecting to the database.
 */
const uploadPost = async (title, content, token) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({ title, content }),
  };
  const resPost = await fetch(
    `${process.env.REACT_APP_HOST}/post`,
    requestOptions
  );
  const bodyMessages = await resPost.json();

  if (resPost.ok) {
    return bodyMessages;
  } else {
    throwError(resPost.status, bodyMessages.message);
  }
};
export { uploadPost };
