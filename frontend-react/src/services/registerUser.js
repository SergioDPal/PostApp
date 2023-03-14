import { throwError } from '../helpers';

/**
 * Registers the user in the database.
 * @param {string} name - Name of the user.
 * @param {string} password - Password of the user.
 * @param {string} email - Email of the user.
 * @returns {object} - Response of the request.
 * @example registerUser('name', 'password', 'email');
 * @throws {Error} - If there is an error connecting to the database, if the user data is incorrect or if the user already exists.
 */
const registerUser = async (name, password, email) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  };
  const res = await fetch(`${process.env.REACT_APP_HOST}/user`, requestOptions);
  const bodyMessages = await res.json();

  if (res.ok) {
    return bodyMessages;
  } else {
    throwError(res.status, bodyMessages.message);
  }
};

export { registerUser };
