import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LoginDataContext } from '../../context/LoginDataProvider';
import { loadPosts } from '../../services';
import { VotePanel } from '../../components/VotePanel/VotePanel';
import { useRequestHandler } from '../../hooks/useRequestHandler';
import { Loading } from '../../components/Loading/Loading';
import './UserPostList.css';
import { useBottomOfScroll } from '../../hooks/useBottomOfScroll';

const UserPostList = () => {
  const { token } = useContext(LoginDataContext);
  const [userPostList, setUserPostlist] = useState([]);

  useRequestHandler(() =>
    loadPosts(userPostList, setUserPostlist, token, 'user')
  );

  const ref = useBottomOfScroll(() =>
    loadPosts(userPostList, setUserPostlist, token, 'user')
  );

  return userPostList === 404 ? (
    <>
      <p className="nocontentmessage">You haven't published anything yet.</p>
      <img
        src="/icons/sad_emoji.svg"
        alt="Sad Face"
        className="emoji"
      />
    </>
  ) : userPostList?.length > 0 ? (
    <>
      <ul
        className="userpostlist"
        ref={ref}
      >
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
                    <p>@{post.user_name}</p>
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
  ) : (
    <Loading />
  );
};

export { UserPostList };
