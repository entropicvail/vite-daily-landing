import { createContext, useContext, useState } from 'react';

const SelectedDateContext = createContext(null)

export const SelectedDateProvider = ({ children }) => {
  const [ sharedDate, setSharedDate ] = useState('');

  const value = { sharedDate, setSharedDate };

  return <SelectedDateContext.Provider value={value}>{children}</SelectedDateContext.Provider>;
};

export const useSelectedDateProvider = () => useContext(SelectedDateContext);