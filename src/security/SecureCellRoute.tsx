import { useAuth } from "../auth/AuthContext";
import { Navigate, Outlet, useParams } from "react-router-dom";
import type { Action, Resources } from "./permission";
import AccessControl from "./AccessControl";
import TenantSecurity from "./TenantSecurity";
import { organizations } from "../auth/organizations";

type SecureCellRouteProps = {
  resource?: Resources;
  action?: Action;
};
const SecureCellRoute = ({ resource, action }: SecureCellRouteProps) => {
  //gets authentication info from auth context
  const { user } = useAuth();
  //slug name og hotel
  const { organizationSlug } = useParams();
  const accessControl = new AccessControl();
  const tenantSecurity = new TenantSecurity();
  //authentication
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  //find org from url
  const requestedOrganization = organizations.find(
    (org) => org.slug === organizationSlug,
  );
  if (!requestedOrganization) {
    return <Navigate to="/unauthorized" replace />;
  }
  ///tenant check
  const tenantallowed = tenantSecurity.canAccessTenant(
    user.organizationId,
    requestedOrganization.id,
  );
  if (!tenantallowed) {
    return <Navigate to="/unauthorized" replace />;
  }
  //permission check
  if (resource && action) {
    const allowed = accessControl.can(user.role, resource, action);
    if (!allowed) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  //access granted
  return <Outlet />;
};

export default SecureCellRoute;
