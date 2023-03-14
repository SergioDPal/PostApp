import { createRef, useEffect } from 'react';

/**
 * @description - A hook that will execute a callback when the user reaches the bottom of the page.
 *
 * @param {callback}  - Will be excuted when the user reaches the bottom of the page.
 * @return {ref} - A ref to be used in the component.
 *
 * @example - const ref = useBottomOfScroll(() => console.log('Bottom of page reached!'));
 */
const useBottomOfScroll = (callback) => {
  const ref = createRef();
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const endOfScroll =
        window.visualViewport.height + window.scrollY ===
        ref?.current?.offsetHeight + ref?.current?.offsetTop;
      if (endOfScroll) {
        callback();
      }
    });
  }, [ref, callback]);
  return ref;
};

export { useBottomOfScroll };
