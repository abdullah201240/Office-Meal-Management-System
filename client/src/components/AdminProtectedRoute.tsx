import React from 'react';
import { Navigate } from 'react-router-dom';
import { adminUseAppSelector } from './hooks/adminLogin';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

  const adminToken = adminUseAppSelector((state) => state.adminAuth.token);
  if (!adminToken) {
    return <Navigate to="/adminLogin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
