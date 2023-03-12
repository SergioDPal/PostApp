const vote = async (postId, value, token) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ value }),
    };
    const resVote = await fetch(
      `${process.env.REACT_APP_HOST}/post/${postId}/vote`,
      requestOptions
    );
    const bodyRes = await resVote.json();
    if (resVote.ok) {
      return bodyRes.data.value;
    } else {
      return bodyRes;
    }
  } catch (err) {
    console.error(err);
  }
};

export { vote };
