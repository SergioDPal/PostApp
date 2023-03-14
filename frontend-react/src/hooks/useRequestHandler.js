import { useEffect, useState } from 'react';

/**
 * @description - A hook that makes a first fetch and if it fails it will try again every 5 seconds until it succeeds.
 * @param {callback} callback - The callback that will be executed.
 * @returns {void}
 * @example useRequestHandler(() => fetch('url'));
 */
const useRequestHandler = (callback) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!response) {
      const tryFirstFetch = async () => {
        try {
          const res = await callback();
          if (res?.ok) {
            setResponse(res);
          }
        } catch (err) {
          console.log(err);
          err.status === 404 &&
            setResponse({ ok: false, status: 404, message: 'Not found' });
          err.message === 'Failed to fetch' &&
            fetchUntilRes(callback, setResponse);
        }
      };
      tryFirstFetch();
    }
  }, [callback, response]);
};

const fetchUntilRes = (callback, setResponse) => {
  const interval = setInterval(async () => {
    try {
      const res = await callback();
      if (res?.ok) {
        setResponse(res);
        clearInterval(interval);
      }
    } catch (err) {
      err.message === 'Failed to fetch'
        ? console.log(err.message)
        : clearInterval(interval);
    }
  }, 5000);
};

export { useRequestHandler };
