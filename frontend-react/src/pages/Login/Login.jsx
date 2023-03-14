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
      setFadingMessage('One or more of the fields are empty.', true);
    } else {
      try {
        const isLogged = await loginUser(
          email,
          password,
          setToken,
          setLoggedUser
        );
        if (isLogged.ok) {
          setFadingMessage('Logged in successfully!');
          nav('/');
        }
      } catch (err) {
        setFadingMessage(
          'There was an error logging in. Please try again.',
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
          placeholder="Password"
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
