import { createContext, useContext, useState } from 'react';

const UserTypeContext = createContext();

export const UserTypeProvider = ({ children }) => {
  const [userType, setUserType] = useState('');

  const setUser = (type) => {
    setUserType(type);
  };

  return (
    <UserTypeContext.Provider value={{ userType, setUser }}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = () => {
  const context = useContext(UserTypeContext);
  if (!context) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
};