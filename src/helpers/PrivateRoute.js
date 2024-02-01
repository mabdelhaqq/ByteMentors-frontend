import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEmail } from './EmailContext';
import Authorize from './Authorize';

const PrivateRoute = ({ path, element, roles }) => {
  const { email } = useEmail();
  const isAuthenticated = Boolean(email);

  return isAuthenticated ? (
    <Routes>
      <Route path={path} element={<Authorize roles={roles}>{element}</Authorize>} />
    </Routes>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
