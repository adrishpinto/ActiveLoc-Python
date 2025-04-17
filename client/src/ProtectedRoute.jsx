// components/ProtectedRoute.js
import React from "react";
import { Navigate, useOutletContext } from "react-router-dom";

const ProtectedRoute = ({ allowedGroups, children }) => {
  const { group } = useOutletContext();

  if (!allowedGroups.includes(group)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
