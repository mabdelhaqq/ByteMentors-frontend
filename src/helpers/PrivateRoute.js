import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useEmail } from './EmailContext';
import Authorize from './Authorize';

const PrivateRoute = ({ path, element, roles }) => {
  const { email } = useEmail();

  if (email) {
    return (
      <Authorize roles={roles}>
        <Route path={path} element={element} />
      </Authorize>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
