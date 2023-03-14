import { useContext } from 'react';
import { Navigate } from 'react-router';
import { LoginDataContext } from '../context/LoginDataProvider';

/**
 * @description - A hook that will navigate to the home page if the user is not logged in.
 * @param {element} element - The element that will be returned if the user is logged in.
 * @returns {element} - The element that will be returned if the user is not logged in.
 * @example const element = useNavigateToHomeIfNoToken(<div>Logged in</div>);
 */
const useNavigateToHomeIfNoToken = (element) => {
  const { token } = useContext(LoginDataContext);
  return !token ? <Navigate to="/" /> : element;
};

/**
 * @description - A hook that will navigate to the home page if the user is logged in.
 * @param {element} element - The element that will be returned if the user is not logged in.
 * @returns {element} - The element that will be returned if the user is logged in.
 * @example const element = useNavigateToHomeIfToken(<div>Logged in</div>);
 */
const useNavigateToHomeIfToken = (element) => {
  const { token } = useContext(LoginDataContext);
  return token ? <Navigate to="/" /> : element;
};

export { useNavigateToHomeIfNoToken, useNavigateToHomeIfToken };
