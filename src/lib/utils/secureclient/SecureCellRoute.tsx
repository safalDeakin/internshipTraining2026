//author:shrajja

import { useAuth } from "./useAuth";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import type { Action, Resources } from "./services/models/permission";

type SecureCellRouteProps = {
  resource?: Resources;
  action?: Action;
};

const SecureCellRoute = () => {

  const { isAuthenticated, isAuthorizedUsingRouteKey } = useAuth();
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

  const routeKey = pathparts[2];

  if (routeKey && !isAuthorizedUsingRouteKey(organizationSlug, routeKey)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default SecureCellRoute;
