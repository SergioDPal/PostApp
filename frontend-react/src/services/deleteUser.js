import { throwError } from '../helpers';

/**
 * Anonymizes the user from the database.
 * @param {string} oldPwd - Old password of the user.
 * @param {string} token - Token of the user.
 * @returns {object} - Response of the request.
 * @throws {Error} - If there is an error connecting to the database.
 */
const deleteUser = async (oldPwd, token) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({ oldPwd }),
  };
  let res = await fetch(
    `${process.env.REACT_APP_HOST}/user/delete`,
    requestOptions
  );
  const bodyres = await res.json();

  if (res.ok) {
    return bodyres;
  } else {
    throwError(res.status, bodyres.message);
  }
};

export { deleteUser };
