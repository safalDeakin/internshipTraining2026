//author:shrajja

import { useAuth } from "./context/useAuth";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import type { Action, Resources } from "./services/models/permission";

type SecureCellRouteProps = {
  resource?: Resources;
  action?: Action;
  permissions?: Record<
    string,
    {
      resource: Resources;
      action: Action;
    }
  >;
};

const SecureCellRoute = ({ permissions = {} }: SecureCellRouteProps) => {
  const { isAuthenticated, isAuthorized } = useAuth();
  const { organizationSlug } = useParams();
  const location = useLocation();
  console.log("organizationSlug:", organizationSlug);
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Organization slug must exist
  if (!organizationSlug) {
    return <Navigate to="/login" replace />;
  }

  const pathparts = location.pathname.split("/");

  console.log("PATH PARTS:", pathparts);

  const routeKey = pathparts[2];

  console.log("ROUTE KEY:", routeKey);

  // /hotel-everest
  // There is no resource yet.
  if (!routeKey) {
    return <Outlet />;
  }

  const permission = permissions[routeKey];

  console.log("PERMISSION:", permission);

  // Resource exists in URL but no permission configuration exists
  if (!permission) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!isAuthorized(organizationSlug, permission.resource, permission.action)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default SecureCellRoute;
