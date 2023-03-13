import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { FadingMessageContext } from '../../context/FadingBannerProvider';
import { deleteLocalStorage } from '../../helpers';

import './Logout.css';

const Logout = ({ setToken, setLoggedUser }) => {
  const { setFadingMessage } = useContext(FadingMessageContext);

  const nav = useNavigate();
  return (
    <p
      className="logoutbutton"
      onClick={(e) => {
        deleteLocalStorage(setToken, setLoggedUser);
        setFadingMessage('Logged out successfully!');
        nav('/');
      }}
    >
      Logout
    </p>
  );
};

export { Logout };
