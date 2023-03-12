import { useEffect, useState } from 'react';

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
