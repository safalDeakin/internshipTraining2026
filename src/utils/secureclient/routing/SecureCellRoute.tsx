//author:shrajja
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import type { Action, Resources } from "../models/permission";
import AccessControl from "../classes/AccessControl";
import TenantSecurity from "../classes/TenantSecurity";
import { useOrganization } from "../context/OrganizationContext";

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
  tenantSecurity: TenantSecurity;
};

const SecureCellRoute = ({
  permissions = {},
  tenantSecurity,
}: SecureCellRouteProps) => {
  const { user } = useAuth(); //gets authentication info from auth context
  const { organizationSlug } = useParams(); //slug name og hotel
  const location = useLocation();
  const { organizations = [] } = useOrganization();
  //create object
  const accessControl = new AccessControl();
  //authentication
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  //slug
  if (!organizationSlug) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  //find org from url
  const requestedOrganization = organizations.find(
    (org) => org.slug === organizationSlug,
  );

  if (!requestedOrganization) {
    return <Navigate to="/unauthorized" replace />;
  }

  //tenant check
  const tenantallowed = tenantSecurity.canAccessTenant(
    user.organizationId,
    requestedOrganization.id,
  );

  if (!tenantallowed) {
    return <Navigate to="/unauthorized" replace />;
  }
  // looking at the current URL to figure out which resource the user is trying to access.
  const pathparts = location.pathname.split("/");
  //Look at the third part of the URL and treat that as the application resource.
  const routeKey = pathparts[2];
  const permission = permissions[routeKey];
  //permission
  if (permission) {
    const allowed = accessControl.can(
      user?.role,
      permission.resource,
      permission.action,
    );
    if (!allowed) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  //access granted

  return (
    <>
      <Outlet />
    </>
  );
};

export default SecureCellRoute;
