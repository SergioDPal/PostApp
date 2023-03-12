import { useEffect, useState } from 'react';
import './FadingBanner.css';

const FadingBanner = ({ messageState }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
  }, []);

  return (
    <section
      id={messageState?.error ? 'errormessage' : 'fadingmessage'}
      style={{
        left:
          screenWidth > 1200
            ? (screenWidth - 200) * 0.2 + 200
            : screenWidth * 0.1,
        width:
          screenWidth > 1200 ? (screenWidth - 200) * 0.6 : screenWidth * 0.8,
      }}
      className={messageState ? 'show' : 'hidden'}
    >
      {messageState?.message}
    </section>
  );
};

export { FadingBanner };
