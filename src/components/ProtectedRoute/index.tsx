import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute: React.FC<any> = () => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  if (!user.id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
