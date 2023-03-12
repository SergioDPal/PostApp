import { throwError } from '../helpers';

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
