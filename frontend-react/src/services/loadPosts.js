import {throwError} from "../helpers";

/**
 * Loads the posts data from the database into the state. If the id is provided, it loads the post with that id. If not, it loads the posts with the url provided.
 * @param {array} listState - State of the list to update.
 * @param {function} setListState - Function to update the listState.
 * @param {string} token - Token of the user.
 * @param {string} url - Url of the posts.
 * @param {number} id - Id of the post.
 * @returns {object} - Response of the request.
 * @example loadPosts(listState, setListState, 'token', 'url');
 * @throws {Error} - If there is an error connecting to the database or if the post is not found.
 */
const loadPosts = async (listState, setListState, token, url = "", id) => {
  let resPosts;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      offset: id ? 0 : listState.length,
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

export {loadPosts};
