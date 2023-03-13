import { useContext, useEffect, useState } from 'react';
import { LoginDataContext } from '../../context/LoginDataProvider';
import { VoteButton } from '../VoteButton/VoteButton';
import './VotePanel.css';

const valueTypes = {
  dislike: -1,
  like: 1,
  [null]: 0,
};

const VotePanel = ({ post }) => {
  const [voteValue, setVoteValue] = useState(post.like_by_user);
  const [likes, setLikes] = useState(post.likes);
  const { token } = useContext(LoginDataContext);

  useEffect(() => {
    if (!token) {
      setVoteValue(null);
    }
  }, [token]);

  const onVote = (newValue) => {
    const diff = valueTypes[newValue] - valueTypes[voteValue];
    setLikes(likes + diff);
    setVoteValue(newValue);
  };

  const buildVoteButton = (icon) => (
    <VoteButton
      voteValue={voteValue}
      postId={post.id}
      onVote={onVote}
      icon={icon}
    />
  );
  return (
    <section className="votepanel">
      {buildVoteButton('dislike')}

      <p
        className={
          likes > 0 ? 'greenlikes' : likes === 0 ? 'blacklikes' : 'redlikes'
        }
      >
        {likes}
      </p>

      {buildVoteButton('like')}
    </section>
  );
};

export { VotePanel };
