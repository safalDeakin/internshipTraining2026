import React from "react";
import { Outlet, Navigate } from "react-router-dom";
//prop from App
const RoleRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("role");
  //if not login
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }
  //  after login userRole is not include in allowedrole prop
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default RoleRoute;
