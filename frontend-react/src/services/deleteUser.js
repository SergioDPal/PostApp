import { throwError } from '../helpers';

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
