import { throwError } from '../helpers';

const uploadPost = async (title, content, token) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({ title, content }),
  };
  const resPost = await fetch(
    `${process.env.REACT_APP_HOST}/post`,
    requestOptions
  );
  const bodyMessages = await resPost.json();

  if (resPost.ok) {
    return bodyMessages;
  } else {
    throwError(resPost.status, bodyMessages.message);
  }
};
export { uploadPost };
