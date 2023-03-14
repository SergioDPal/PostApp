/**
 * Function to throw an error with a message and status code.
 * @param {number} status - Status code of the error.
 * @param {string} message - Message of the error.
 * @example throwError(404, 'Not found');
 */
const throwError = (status, message) => {
  console.log(message);
  const err = new Error(message);
  err.status = status;
  throw err;
};

export { throwError };
