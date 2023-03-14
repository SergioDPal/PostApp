import { NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { EditUser } from './pages/EditUser/EditUser';
import { Profile } from './pages/Profile/Profile';
import { PhoneMenu } from './components/PhoneMenu/PhoneMenu';
import './App.css';
import {
  useNavigateToHomeIfNoToken,
  useNavigateToHomeIfToken,
} from './hooks/useNavigateIfCondition';
import { NewPost } from './pages/NewPost/NewPost';
import { PostList } from './pages/PostList/PostList';
import { SinglePost } from './pages/SinglePost/SinglePost';
import { UserPostList } from './pages/UserPostList/UserPostList';

function App() {
  return (
    <div className="App">
      <header className="mainheader">
        <img
          src="/icons/react_icon.svg"
          alt="logo"
        ></img>
        <NavLink to="/">
          <h1> PostApp </h1>
        </NavLink>

        <PhoneMenu />
      </header>
      <main>
        <Routes>
          <Route
            path="/login"
            element={useNavigateToHomeIfToken(<Login />)}
          />
          <Route
            path="/register"
            element={useNavigateToHomeIfToken(<Register />)}
          />

          <Route
            path="/user/edit"
            element={useNavigateToHomeIfNoToken(<EditUser />)}
          />
          <Route
            path="/newpost"
            element={useNavigateToHomeIfNoToken(<NewPost />)}
          />
          <Route
            path="/user/posts"
            element={useNavigateToHomeIfNoToken(<UserPostList />)}
          />

          <Route
            path="/user/:id"
            element={<Profile />}
          />
          <Route
            path="/post/:id"
            element={<SinglePost />}
          />

          <Route
            path="/"
            element={<PostList />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
