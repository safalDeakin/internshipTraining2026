//author:shrajja

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useParams,
} from "react-router-dom";
import SecureCellRoute from "./SecureCellRoute";
import type { ReactNode } from "react";
import Unauthorized from "./pages/Unauthorized";
import type { Action, Resources } from "./services/models/permission";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import Navbar from "./pages/Navbar";

interface SecureConfig {
  authServerUrl: string;
  clientId: string;
  pubKey: string;
}

// interface PermissionConfig {
//   resource: Resources;
//   action: Action;
// }
interface SecureAppClientProps {
  children?: ReactNode;
  config?: SecureConfig;
  permissions?: Record<
    string,
    {
      resource: Resources;
      action: Action;
    }
  >;
}
const OrganizationLayout = () => {
  const { organizationSlug } = useParams();
  console.log("ORGANIZATION LAYOUT SLUG:", organizationSlug);
  return (
    <>
      {" "}
      <Navbar /> <Outlet />{" "}
    </>
  );
};
//should not create application route here only accept props from parent
const SecureAppClient = ({
  children,
  config,
  permissions = {},
}: SecureAppClientProps) => {
  console.log("Loading Secure App Client: Setting config -> " + config);

  //config pass to authservice and call authentication server there
  //later after start real work for leave as it is
  // const authService=new AuthService(config)
  return (
    <>
      <AuthProvider>
        {" "}
        <BrowserRouter>
          {/* <Navbar /> */}
          <Routes>
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
            <Route path="/login" element={<Login />} />
            <Route
              path=":organizationSlug/*"
              element={<SecureCellRoute permissions={permissions} />}
            >
              <Route element={<OrganizationLayout />}> {children} </Route>
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default SecureAppClient;
