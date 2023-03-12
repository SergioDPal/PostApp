import { throwError } from '../helpers';

const deleteVote = async (postId, token) => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const resVote = await fetch(
      `${process.env.REACT_APP_HOST}/post/${postId}/vote`,
      requestOptions
    );
    const bodyRes = await resVote.json();
    if (resVote.ok) {
      return bodyRes;
    } else {
      throwError(resVote.status, bodyRes.message);
    }
  } catch (err) {
    console.error(err);
  }
};

export { deleteVote };
