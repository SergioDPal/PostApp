import { useContext } from 'react';
import { FadingMessageContext } from '../../context/FadingBannerProvider';
import { LoginDataContext } from '../../context/LoginDataProvider';
import { deleteVote, vote } from '../../services';
import './VoteButton.css';

const VoteButton = ({ postId, voteValue, icon, onVote }) => {
  const { setFadingMessage } = useContext(FadingMessageContext);
  const { token } = useContext(LoginDataContext);

  const getImage = () => {
    return voteValue && voteValue === icon
      ? `/icons/${voteValue}color.svg`
      : `/icons/${icon}.svg`;
  };

  const updateVote = () => {
    return voteValue !== icon
      ? async () => {
          try {
            const res = await vote(postId, icon, token);
            onVote(res);
          } catch (err) {
            setFadingMessage(err.message, true);
          }
        }
      : async () => {
          try {
            await deleteVote(postId, token);
            onVote(null);
          } catch (err) {
            setFadingMessage(err.message, true);
          }
        };
  };

  return (
    <img
      className={`${icon}icon`}
      src={getImage()}
      alt={`${icon}`}
      onClick={
        token
          ? updateVote()
          : () => {
              setFadingMessage('Inicia sesión para votar', true);
            }
      }
    />
  );
};

export { VoteButton };
