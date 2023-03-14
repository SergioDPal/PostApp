import { throwError } from '../helpers';

/**
 * Gets the user profile data from the database and updates the profileData. If the token matches the id, also returns the email and the user can edit the profile.
 * @param {string} token - Token of the user.
 * @param {number} id - Id of the user.
 * @param {function} setProfileData - Function to update the profileData.
 * @returns {object} - Response of the request.
 * @example getUserProfile('token', 1, setProfileData);
 * @throws {Error} - If there is an error connecting to the database or if the user is not found.
 */
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
