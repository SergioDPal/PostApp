import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { FadingMessageContext } from '../../context/FadingBannerProvider';
import { LoginDataContext } from '../../context/LoginDataProvider';
import { loginUser } from '../../services';
import './Login.css';

const Login = () => {
  const { setFadingMessage } = useContext(FadingMessageContext);
  const { setToken, setLoggedUser } = useContext(LoginDataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !email) {
      setFadingMessage('¡Rellena todos los campos!', true);
    } else {
      try {
        const isLogged = await loginUser(
          email,
          password,
          setToken,
          setLoggedUser
        );
        if (isLogged.ok) {
          setFadingMessage('¡Te has logueado con éxito!');
          nav('/');
        }
      } catch (err) {
        setFadingMessage(
          'Error al iniciar sesión. Asegúrate de que las credenciales sean correctas.',
          true
        );
      }
      setEmail('');
      setPassword('');
    }
  };

  return (
    <section className="loginwrapper">
      <form
        className="loginform"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="email"
          required
        ></input>

        <input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="password"
          required
        ></input>
        <button className="bigbutton">Login</button>
      </form>
    </section>
  );
};

export { Login };
