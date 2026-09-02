import { Outlet, Navigate } from "react-router-dom";
//prop from App

type RoleRouteProps = {
  allowedRoles: string[];
};
const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
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
