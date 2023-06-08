import { useNavigate } from 'react-router';
import { deletePost } from '../../services';

const DeletePostButton = ({ postId, token, setFadingMessage }) => {
  const nav = useNavigate();
  return (
    <img
      id="trash"
      className="icon"
      src="/icons/trash.svg"
      alt="trash"
      onClick={async () => {
        if (window.confirm('¿Are you sure you want to delete this post?')) {
          try {
            const res = await deletePost(postId, token);
            if (res.ok) {
              setFadingMessage('Post deleted.');
              nav('/user/posts');
            }
          } catch (error) {
            setFadingMessage('Error deleting the post.', true);
          }
        }
      }}
    />
  );
};

export { DeletePostButton };
