import { throwError } from '../helpers';

/**
 * Edits the user profile in the database.
 * @param {object} formData - Form data of the user.
 * @param {string} token - Token of the user.
 * @returns {object} - Response of the request.
 * @throws {Error} - If there is an error connecting to the database, if the user data is incorrect or if the user already exists.
 */
const editUser = async (formData, token) => {
  const requestOptions = {
    method: 'PUT',
    headers: { Authorization: token },
    body: formData,
  };
  const resLogin = await fetch(
    `${process.env.REACT_APP_HOST}/user/edit`,
    requestOptions
  );
  const resBody = await resLogin.json();

  if (resLogin.ok) {
    return resBody;
  } else {
    throwError(resLogin.status, resBody.message);
  }
};

export { editUser };
