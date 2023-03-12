import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { loadPosts, updatePost } from '../../services';
import { DeletePostButton } from '../../components/DeletePostButton/DeletePostButton';
import { NavLink } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { Loading } from '../Loading/Loading';
import { VotePanel } from '../../components/VotePanel/VotePanel';
import { LoginDataContext } from '../../context/LoginDataProvider';
import { FadingMessageContext } from '../../context/FadingBannerProvider';
import { useRequestHandler } from '../../hooks/useRequestHandler';
import './SinglePost.css';

const SinglePost = () => {
  const { setFadingMessage } = useContext(FadingMessageContext);
  const { token, loggedUser } = useContext(LoginDataContext);
  const [currentPost, setCurrentPost] = useState();
  const [titleText, setTitleText] = useState();
  const [contentText, setContentText] = useState();
  const [isEditingPost, setIsEditingPost] = useState(false);
  const { id } = useParams();

  useRequestHandler(() => loadPosts(setCurrentPost, token, 'user', id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updatePost(token, titleText, contentText, id);
      if (res.status === 'ok') {
        setCurrentPost({ ...currentPost, ...res.data });
        setFadingMessage('Post actualizado');
      }
    } catch (err) {
      err.message === 'Failed to fetch'
        ? setFadingMessage('Ha habido un error de conexión.', true)
        : setFadingMessage(err.message, true);
    }
  };

  return currentPost ? (
    <section className="singlepost">
      {!isEditingPost ? (
        <>
          <header className="postheader">
            <h2 className="posttitle">{currentPost.title}</h2>
            <NavLink to={`/user/${currentPost.id_user}`}>
              <p className="postauthor">@{currentPost.name}</p>
            </NavLink>
            {loggedUser?.id === currentPost.id_user && (
              <section className="buttons">
                <img
                  id="edit"
                  className="icon"
                  src="/icons/edit.svg"
                  alt="edit"
                  onClick={() => {
                    setIsEditingPost(!isEditingPost);
                    setTitleText(currentPost.title);
                    setContentText(currentPost.content);
                  }}
                />
              </section>
            )}
          </header>
          <section className="postcontent">
            <p>{currentPost.content}</p>
          </section>
        </>
      ) : (
        <>
          <form
            className="postedit"
            name="title"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
              setIsEditingPost(!isEditingPost);
            }}
          >
            <header className="postheader">
              <TextareaAutosize
                className="titletext"
                rows={1}
                data-autoresize
                type="text"
                value={titleText}
                onChange={(e) => {
                  setTitleText(e.target.value);
                }}
                autoFocus
                maxLength="60"
                required
              ></TextareaAutosize>
              <p className="postauthor">@{currentPost.name}</p>
              <section className="buttons">
                <>
                  <button
                    className="cancel"
                    onClick={(e) => {
                      e.preventDefault();

                      setIsEditingPost(!isEditingPost);
                    }}
                  />
                  <button
                    id="save"
                    className="save"
                    type="submit"
                    alt="save"
                  />
                </>
              </section>
            </header>
            <TextareaAutosize
              className="contentext"
              data-autoresize
              type="textarea"
              value={contentText}
              onChange={(e) => {
                setContentText(e.target.value);
              }}
              required
              rows={1}
              maxLength="500"
            ></TextareaAutosize>
          </form>
        </>
      )}
      {loggedUser?.id === currentPost.id_user && (
        <DeletePostButton
          postId={currentPost.id}
          token={token}
          setFadingMessage={setFadingMessage}
        />
      )}
      <VotePanel post={currentPost} />
    </section>
  ) : (
    <Loading />
  );
};

export { SinglePost };
