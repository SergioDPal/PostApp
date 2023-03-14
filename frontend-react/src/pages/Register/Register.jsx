import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { BigButton } from '../../components/BigButton/BigButton';
import { FadingMessageContext } from '../../context/FadingBannerProvider';
import { registerUser } from '../../services';
import './Register.css';

const Register = () => {
  const { setFadingMessage } = useContext(FadingMessageContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(userName, password, email);
      if (res.status === 'ok') {
        setEmail('');
        setUserName('');
        setPassword('');
        setFadingMessage('Registered successfully!');
        nav('/login');
      }
    } catch (err) {
      if (err.status === 409) {
        setFadingMessage('User already exists.', true);
        return;
      } else if (err.status === 400) {
        setFadingMessage('Please fill all the fields', true);
        return;
      }
      setFadingMessage('Something went wrong. Please try again.', true);
    }
  };

  return (
    <section className="registerwrapper">
      <form
        className="registerform"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Name"
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          className="username"
          required
        ></input>

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
        <BigButton>Register</BigButton>
      </form>
    </section>
  );
};

export { Register };
