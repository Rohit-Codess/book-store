import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../hooks/useApp.js';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useApp();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
