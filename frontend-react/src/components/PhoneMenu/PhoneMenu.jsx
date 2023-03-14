import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginDataContext } from '../../context/LoginDataProvider';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { Logout } from '../Logout/Logout';
import './PhoneMenu.css';

const PhoneMenu = () => {
  const { token, setToken, loggedUser, setLoggedUser } =
    useContext(LoginDataContext);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const BlankSpace = () => <section className="blankspace" />;

  const { width } = useWindowDimensions();

  return hasBeenOpened || width >= 1200 ? (
    <>
      <img
        className="menubutton"
        src="/icons/menu_icon.svg"
        alt="Menu"
        onClick={() => setIsVisible(!isVisible)}
      />
      <section
        className={isVisible ? 'menuwrappervisible' : 'menuwrapperhidden'}
        onClick={(e) =>
          e.target.className !== 'blankspace' && setIsVisible(false)
        }
      >
        <nav
          onClick={(e) => {
            e.target.className !== 'blankspace' && setIsVisible(false);
          }}
          className={isVisible ? 'phonemenuvisible' : 'phonemenuhidden'}
        >
          {token && loggedUser ? (
            <>
              <NavLink to={`/user/${loggedUser.id}`}>
                {`${loggedUser.name}`}
              </NavLink>
              <NavLink to="/newpost">New post</NavLink>
              <NavLink to="/user/posts">My posts</NavLink>

              <Logout
                setToken={setToken}
                setLoggedUser={setLoggedUser}
              />
              <BlankSpace />
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>

              <NavLink to="/register">Register</NavLink>
              <BlankSpace />
            </>
          )}
        </nav>
      </section>
    </>
  ) : (
    <img
      className="menubutton"
      src="/icons/menu_icon.svg"
      alt="Menu"
      onClick={() => {
        setIsVisible(!isVisible);
        setHasBeenOpened(true);
      }}
    />
  );
};

export { PhoneMenu };
