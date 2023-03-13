import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { BigButton } from '../../components/BigButton/BigButton';
import { FadingMessageContext } from '../../context/FadingBannerProvider';
import { LoginDataContext } from '../../context/LoginDataProvider';
import { uploadPost } from '../../services';
import './NewPost.css';

const NewPost = () => {
  const { setFadingMessage } = useContext(FadingMessageContext);

  const { token } = useContext(LoginDataContext);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postTitle.length > 0 && postContent.length > 0) {
      try {
        const res = await uploadPost(postTitle, postContent, token);
        setPostTitle('');
        setPostContent('');
        setFadingMessage('Post published!');
        res && nav(`/post/${res.response}`);
      } catch (err) {
        setFadingMessage(err.message, true);
      }
    } else {
      setFadingMessage('Please fill both fields.', true);
    }
  };

  return (
    <section className="newpostwrapper">
      <form
        className="newpostform"
        id="newpostform"
        onSubmit={handleSubmit}
      >
        <section className="textareawrapper">
          <ReactTextareaAutosize
            className="titletext"
            placeholder="Title"
            type="text"
            value={postTitle}
            maxLength="60"
            required
            data-autoresize
            onChange={(e) => {
              setPostTitle(e.target.value);
            }}
          ></ReactTextareaAutosize>

          <ReactTextareaAutosize
            className="contenttext"
            placeholder="Content"
            type="text"
            value={postContent}
            data-autoresize
            maxLength="500"
            required
            onChange={(e) => {
              setPostContent(e.target.value);
            }}
          ></ReactTextareaAutosize>
        </section>
      </form>
      <BigButton form="newpostform">Post</BigButton>
    </section>
  );
};

export { NewPost };
