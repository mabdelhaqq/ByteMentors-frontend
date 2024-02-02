import React from 'react';
import { Navigate } from 'react-router-dom';

const Authorize = ({ roles, children }) => {
  const userType = localStorage.getItem('userType');


  if (userType && roles.includes(userType)) {
    return <>{children}</>;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default Authorize;