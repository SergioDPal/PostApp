import {useEffect, useState} from "react";

/**
 * @description - A hook that makes a first fetch and if it fails it will try again every 5 seconds until it succeeds.
 * @param {callback} callback - The callback that will be executed.
 * @param {any} dependency - Optional dependency that will force the hook to make a new fetch.
 * @returns {void}
 * @example useRequestHandler(() => fetch('url'));
 */
const useRequestHandler = (callback, dependency = null) => {
  const [response, setResponse] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    if (shouldFetch) {
      const tryFirstFetch = async () => {
        try {
          const res = await callback();
          if (res?.ok) {
            setResponse(res);
            setShouldFetch(false);
          }
        } catch (err) {
          console.log(err);
          err.status === 404 &&
            setResponse({ok: false, status: 404, message: "Not found"});
          err.message === "Failed to fetch" &&
            fetchUntilRes(callback, setResponse);
        }
      };
      tryFirstFetch();
    }
  }, [callback, shouldFetch]);

  useEffect(() => {
    setShouldFetch(true);
  }, [dependency]);

  return response;
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
      err.message === "Failed to fetch"
        ? console.log(err.message)
        : clearInterval(interval);
    }
  }, 5000);
};

export {useRequestHandler};
