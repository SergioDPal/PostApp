import { throwError } from '../helpers';

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
