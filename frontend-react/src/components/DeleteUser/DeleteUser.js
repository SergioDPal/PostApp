import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { FadingMessageContext } from '../../context/FadingBannerProvider';
import { LoginDataContext } from '../../context/LoginDataProvider';
import { deleteUser } from '../../services';
import { deleteLocalStorage } from '../../helpers';
import './DeleteUser.css';
import { BigButton } from '../BigButton/BigButton';

const DeleteUser = () => {
  const { setFadingMessage } = useContext(FadingMessageContext);

  const { token, setToken, setLoggedUser } = useContext(LoginDataContext);
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm('¿Estás seguro de querer borrar tu usuario?')) {
      if (!password) {
        setFadingMessage('Debes introducir tu contraseña.', true);
      } else {
        try {
          const deleteSuccess = await deleteUser(password, token);
          setPassword('');
          if (deleteSuccess?.status === 'ok') {
            setFadingMessage(deleteSuccess.data.message);
            setTimeout(() => {
              deleteLocalStorage(setToken, setLoggedUser);
              nav('/');
            }, 2000);
          }
        } catch (err) {
          setPassword('');
          setFadingMessage(err.message, true);
        }
      }
    }
  };

  return (
    <form
      className="deleteuserform"
      onSubmit={handleSubmit}
    >
      <label htmlFor="deleteuser"></label>
      <input
        className="deleteuser"
        name="deleteuser"
        placeholder="Contraseña"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <BigButton>Eliminar usuario</BigButton>
    </form>
  );
};

export { DeleteUser };
