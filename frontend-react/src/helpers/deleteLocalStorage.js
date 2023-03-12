const deleteLocalStorage = (setToken, setLoggedUser) => {
  setToken(null);
  setLoggedUser(null);
};

export { deleteLocalStorage };
