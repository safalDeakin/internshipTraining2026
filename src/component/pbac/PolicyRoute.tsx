import { canAccess } from "./authorization";
import { Navigate, Outlet } from "react-router-dom";
interface User {
  role: string;
}

interface PolicyProps {
  user: User;
  resource: string;
  action: string;
}
const PolicyRoute = ({ user, resource, action }: PolicyProps) => {
  const allowed = canAccess({ user, resource, action });
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowed) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default PolicyRoute;
