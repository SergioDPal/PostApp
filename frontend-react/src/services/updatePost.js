import { throwError } from '../helpers';

/**
 * Updates the post data to the database.
 * @param {string} token - Token of the user.
 * @param {string} title - Title of the post.
 * @param {string} content - Content of the post.
 * @param {number} id - Id of the post.
 * @returns {object} - Response of the request.
 * @example updatePost('token', 'title', 'content', 1);
 * @throws {Error} - If there is an error connecting to the database or if the post title already exists.
 */
const updatePost = async (token, title, content, id) => {
  let finalBody;

  finalBody = JSON.stringify({ title, content });

  try {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: finalBody,
    };
    const resPost = await fetch(
      `${process.env.REACT_APP_HOST}/post/${id}`,
      requestOptions
    );
    const bodyRes = await resPost.json();
    if (resPost.ok) {
      return bodyRes;
    } else {
      throwError(resPost.status, bodyRes.message);
    }
  } catch (err) {
    console.error(err);
  }
};

export { updatePost };
