import { throwError } from '../helpers';

const loadPosts = async (listState = [], setListState, token, url = '', id) => {
  let resPosts;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
      offset: listState?.length === 0 ? 0 : listState.length,
    },
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
      const filteredMessages = bodyMessages.data.posts.filter((post) => {
        let found = false;
        for (const listpost of listState) {
          if (listpost.id === post.id) {
            found = true;
          } else continue;
        }

        return !found && post;
      });
      setListState([...listState, ...filteredMessages]);
      return resPosts;
    }
  } else {
    if (listState.length === 0) {
      setListState(resPosts.status, bodyMessages.message);
    }
    if (resPosts.status === 404 && listState.length !== 0) {
    } else throwError(resPosts.status, bodyMessages.message);
  }
};

export { loadPosts };
