import { createContext, useEffect, useState } from 'react';
import { FadingBanner } from '../components/FadingBanner/FadingBanner';

const FadingMessageContext = createContext();

const FadingMessageProvider = ({ children }) => {
  const [messageState, setMessageState] = useState();
  useEffect(() => {
    if (messageState !== false) {
      setTimeout(() => setMessageState(false), 2900);
    }
  }, [messageState]);

  const setFadingMessage = (message, error) => {
    setMessageState({ message, error: error || false });
  };
  return (
    <FadingMessageContext.Provider value={{ setFadingMessage }}>
      <FadingBanner messageState={messageState} />

      {children}
    </FadingMessageContext.Provider>
  );
};

export { FadingMessageContext, FadingMessageProvider };
