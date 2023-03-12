import { throwError } from '../helpers';

const updatePost = async (token, title, content, id) => {
  let finalBody;

  finalBody = JSON.stringify({ title, content });

  try {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: finalBody,
    };
    const resPost = await fetch(
      `${process.env.REACT_APP_HOST}/post/${id}`,
      requestOptions
    );
    const bodyRes = await resPost.json();
    if (resPost.ok) {
      return bodyRes;
    } else {
      throwError(resPost.status, bodyRes.message);
    }
  } catch (err) {
    console.error(err);
  }
};

export { updatePost };
