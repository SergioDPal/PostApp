import { throwError } from '../helpers';

/**
 * Checks with the database if the user data is correct. If it is, updates the token and the loggedUser.
 * @param {string} email - Email of the user.
 * @param {string} password - Password of the user.
 * @param {function} setToken - Function to update the token.
 * @param {function} setLoggedUser - Function to update the loggedUser.
 * @returns {object} - Response of the request.
 * @example loginUser('email', 'password', setToken, setLoggedUser);
 * @throws {Error} - If there is an error connecting to the database or if the user data is incorrect.
 */
const loginUser = async (email, password, setToken, setLoggedUser) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };
  const resLogin = await fetch(
    `${process.env.REACT_APP_HOST}/user/login`,
    requestOptions
  );

  const bodyMessages = await resLogin.json(); // traduzco, paso a objeto JS
  if (resLogin.ok) {
    setToken(bodyMessages.data.token); // meto en el setToken
    setLoggedUser({
      name: bodyMessages.data.name,
      email: bodyMessages.data.email,
      createdAt: bodyMessages.data.createdAt,
      id: bodyMessages.data.id,
      avatar: bodyMessages.data.avatar,
    });
    return resLogin;
  } else {
    throwError(resLogin.status, bodyMessages.message);
  }
};

export { loginUser };
