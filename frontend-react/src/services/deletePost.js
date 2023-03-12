import { throwError } from '../helpers';

const deletePost = async (postId, token) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: token },
  };
  const resVote = await fetch(
    `${process.env.REACT_APP_HOST}/post/${postId}`,
    requestOptions
  );

  const bodyVote = await resVote.json();
  if (resVote.ok) {
    return resVote;
  } else {
    throwError(resVote.status, bodyVote.message);
  }
};

export { deletePost };
