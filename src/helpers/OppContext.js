import React, { createContext, useContext, useState } from 'react';

const OppContext = createContext();

export const OppProvider = ({ children }) => {
  const [opportunity, setOpportunity] = useState({
    field: '',
    deadline: '',
    description: '',
  });

  const updateOpportunity = (newOpportunity) => {
    setOpportunity(newOpportunity);
  };

  return (
    <OppContext.Provider value={{ opportunity, updateOpportunity }}>
      {children}
    </OppContext.Provider>
  );
};

export const useOppContext = () => {
  return useContext(OppContext);
};
