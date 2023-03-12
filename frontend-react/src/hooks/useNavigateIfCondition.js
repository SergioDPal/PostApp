import { useContext } from 'react';
import { Navigate } from 'react-router';
import { LoginDataContext } from '../context/LoginDataProvider';

const useNavigateToHomeIfNoToken = (element) => {
  const { token } = useContext(LoginDataContext);
  return !token ? <Navigate to="/" /> : element;
};

const useNavigateToHomeIfToken = (element) => {
  const { token } = useContext(LoginDataContext);
  return token ? <Navigate to="/" /> : element;
};

export { useNavigateToHomeIfNoToken, useNavigateToHomeIfToken };
