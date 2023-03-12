import { throwError } from '../helpers';

const loadPosts = async (setListState, token, url = '', id) => {
  let resPosts;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: token },
  };
  if (id) {
    resPosts = await fetch(
      `${process.env.REACT_APP_HOST}/post/${id}`,
      requestOptions
    );
  } else {
    resPosts = await fetch(
      `${process.env.REACT_APP_HOST}/posts/${url}`,
      requestOptions
    );
  }
  const bodyMessages = await resPosts.json();
  if (resPosts.ok) {
    if (id) {
      setListState(bodyMessages.data.post);
      return resPosts;
    } else {
      setListState(bodyMessages.data.posts);
      return resPosts;
    }
  } else {
    throwError(resPosts.status, bodyMessages.message);
  }
};

export { loadPosts };
