import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ isAllow, children }) {
  let location = useLocation();

  if (!isAllow) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
