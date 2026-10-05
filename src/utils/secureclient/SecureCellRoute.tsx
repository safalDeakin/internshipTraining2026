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
  const { isAuthenticated, isAuthorized } = useAuth(); //gets authentication info from auth context
  const { organizationSlug } = useParams(); //slug name og hotel
  const location = useLocation();

  console.log("We are here");

  //Here we check if user has valid token or not.
  if (!isAuthenticated()) {
    console.log("isAuthenticated Result False");
    return <Navigate to="/login" replace />;
  }
  console.log("isAuthenticated Result True");


  //slug
  if (!organizationSlug) {
    console.log("organizationSlug Result True");
    return (
      <>
        {/* <Navbar /> */}
        <Outlet />
      </>
    );
  }

  // looking at the current URL to figure out which resource the user is trying to access.
  const pathparts = location.pathname.split("/");
  //Look at the third part of the URL and treat that as the application resource.
  const routeKey = pathparts[2];
  const permission = permissions[routeKey];

  // Her we check if user is authorized or not
  if (!isAuthorized(organizationSlug, permission.resource, permission.action)) {
    console.log("isAuthorized Result False");
    return <Navigate to="/unauthorized" replace />;
  }


  //access granted
  return (
    <>
      {/* {showNavbar && <Navbar />} */}
      <Outlet />
    </>
  );
};

export default SecureCellRoute;
