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
        if (window.confirm('¿Estás seguro de querer borrar este post?')) {
          try {
            const res = await deletePost(postId, token);
            if (res.ok) {
              setFadingMessage('Post borrado');
              nav('/user/posts');
            }
          } catch (error) {
            setFadingMessage('Error al borrar el post', true);
          }
        }
      }}
    />
  );
};

export { DeletePostButton };
