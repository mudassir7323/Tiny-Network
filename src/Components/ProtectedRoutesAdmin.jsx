import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("AdminloginToken");

  return isAuthenticated ? element : <Navigate to="/Admin-login" />;
};

export default ProtectedRoute;
