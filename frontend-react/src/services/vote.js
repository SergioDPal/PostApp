/**
 * Sends the vote to the server. Saves the new vote or updates the value of the existing vote.
 * @param {number} postId - The id of the post to vote.
 * @param {string} value - The value of the vote.
 * @param {string} token - The token of the user.
 * @returns {object} - Response of the request.
 * @example vote(1, 'like', 'token');
 */
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
