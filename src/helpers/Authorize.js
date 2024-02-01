import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useUserType } from './UserTypeContext';

const Authorize = ({ roles, children }) => {
  // const { userType } = useUserType();
  const userType = localStorage.getItem('userType');


  if (userType && roles.includes(userType)) {
    return <>{children}</>;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default Authorize;
