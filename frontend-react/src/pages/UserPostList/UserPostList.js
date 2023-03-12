import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginDataContext } from '../../context/LoginDataProvider';
import { loadPosts } from '../../services';
import { VotePanel } from '../../components/VotePanel/VotePanel';
import { useRequestHandler } from '../../hooks/useRequestHandler';
import './UserPostList.css';

const UserPostList = () => {
  const { token } = useContext(LoginDataContext);
  const [userPostList, setUserPostlist] = useState([]);

  useRequestHandler(() => loadPosts(setUserPostlist, token, 'user'));

  return typeof userPostList === 'string' ? (
    <p className="errormessage">{userPostList}</p>
  ) : (
    <>
      <ul className="userpostlist">
        {userPostList.map((post) => {
          return (
            <li key={post.id}>
              <section className="postbox">
                <header className="postheader">
                  <NavLink
                    className="posttitle"
                    to={`/post/${post.id}`}
                  >
                    <p>
                      {post.title.length > 21
                        ? post.title.slice(0, 21) + '...'
                        : post.title}
                    </p>
                  </NavLink>
                  <NavLink
                    className="postauthor"
                    to={`/user/${post.id_user}`}
                  >
                    <p>@{post.name}</p>
                  </NavLink>
                </header>
                <p className="postcontent">
                  {post.content.length > 120
                    ? post.content.slice(0, 120) + '...'
                    : post.content}
                </p>
                <VotePanel post={post} />
              </section>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export { UserPostList };
