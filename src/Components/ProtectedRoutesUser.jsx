import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("UserloginToken");

  return isAuthenticated ? element : <Navigate to="/User-login" />;
};

export default ProtectedRoute;
