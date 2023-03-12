import { throwError } from '../helpers';

const getUserProfile = async (token, id, setProfileData) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: token },
  };
  const res = await fetch(
    `${process.env.REACT_APP_HOST}/user/${id}`,
    requestOptions
  );
  const bodyMessages = await res.json();

  if (res.ok) {
    setProfileData(bodyMessages.data.user);
    return res;
  } else {
    throwError(res.status, bodyMessages.message);
  }
};

export { getUserProfile };
