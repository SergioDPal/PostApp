const throwError = (status, message) => {
  console.log(message);
  const err = new Error(message);
  err.status = status;
  throw err;
};

export { throwError };
