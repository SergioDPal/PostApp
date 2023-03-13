import { useEffect, useState } from 'react';

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
