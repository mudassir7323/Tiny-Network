import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("UserloginToken");
  
  const isAuthenticated2 = localStorage.getItem("AdminloginToken");

  return (isAuthenticated || isAuthenticated2) ? element : <Navigate to="/User-login" />;
};

export default ProtectedRoute;
