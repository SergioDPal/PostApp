import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginDataContext } from '../../context/LoginDataProvider';
import { loadPosts } from '../../services';
import { VotePanel } from '../../components/VotePanel/VotePanel';
import { useRequestHandler } from '../../hooks/useRequestHandler';
import { Loading } from '../../components/Loading/Loading';
import './PostList.css';

const PostList = () => {
  const { token } = useContext(LoginDataContext);
  const [postList, setPostlist] = useState([]);

  useRequestHandler(() => loadPosts(setPostlist, token));

  return postList.length === 0 ? (
    <Loading />
  ) : (
    <ul className="postlist">
      {postList.map((post) => {
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
                {' '}
                {post.content.length > 120
                  ? post.content.slice(0, 120) + '...'
                  : post.content}
              </p>

              <VotePanel
                token={token}
                post={post}
              />
            </section>
          </li>
        );
      })}
    </ul>
  );
};

export { PostList };
