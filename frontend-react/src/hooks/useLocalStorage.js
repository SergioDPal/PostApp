import { useEffect, useState } from 'react';

/**
 * @description - A hook that will create a state that will be stored in the local storage.
 * @param {string} label - The label that will be used to store the state in the local storage.
 * @param {any} [initialvalue]  - The initial value of the state.
 * @returns {array} - The state and the function to update the state.
 * @example const [data, setData] = useLocalStorage('label', 'initialvalue');
 */
const useLocalStorage = (label, initialvalue = null) => {
  const [data, setData] = useState(
    localStorage.getItem(label)
      ? JSON.parse(localStorage.getItem(label))
      : initialvalue
  );
  useEffect(() => {
    localStorage.setItem(label, JSON.stringify(data));
  }, [label, data]);
  return [data, setData];
};

export { useLocalStorage };
