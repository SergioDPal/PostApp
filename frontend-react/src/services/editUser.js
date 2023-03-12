import { throwError } from '../helpers';

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
