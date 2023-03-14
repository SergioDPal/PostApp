/**
 * Function to delete the local storage of the user and update the state.
 * @param {function} setState1 - Function to set the state of the first state variable
 * @param {function} [setState2] - Function to set the state of the second state variable
 * @example deleteLocalStorage(setState1, setState2);
 */
const deleteLocalStorage = (setState1, setState2) => {
  setState1(null);
  setState2 ?? setState2(null);
};

export { deleteLocalStorage };
