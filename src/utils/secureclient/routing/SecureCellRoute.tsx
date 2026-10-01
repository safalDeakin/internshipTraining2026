import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import type { Action, Resources } from "../models/permission";
import AccessControl from "../classes/AccessControl";
import TenantSecurity from "../classes/TenantSecurity";
import { organizations } from "../models/organizations";
import Navbar from "../../../component/Navbar";

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
  showNavbar?: boolean;
};

const SecureCellRoute = ({
  permissions = {},
  showNavbar = false,
}: SecureCellRouteProps) => {
  const { user } = useAuth(); //gets authentication info from auth context
  const { organizationSlug } = useParams(); //slug name og hotel
  const location = useLocation();

  //create object
  const accessControl = new AccessControl();
  const tenantSecurity = new TenantSecurity();

  //authentication
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  //slug
  if (!organizationSlug) {
    return (
      <>
        <Navbar />
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
  ///tenant check
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
      {showNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default SecureCellRoute;
