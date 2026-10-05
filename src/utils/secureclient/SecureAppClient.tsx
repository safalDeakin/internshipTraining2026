//author:shrajja
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SecureCellRoute from "./routing/SecureCellRoute";
import type { ReactNode } from "react";
import Unauthorized from "./component/Unauthorized";
import type { Action, Resources } from "./models/permission";
import Login from "./component/Login";
import { AuthProvider } from "./context/AuthContext";
import { OrganizationProvider } from "./context/OrganizationContext";
import Navbar from "./component/Navbar";
import type { Organization } from "./models/organizations";
import TenantSecurity from "./classes/TenantSecurity";

interface SecureConfig {
  authServerUrl: string;
  clientId: string;
  pubKey: string;
}

interface SecureAppClientProps {
  children?: ReactNode;
  config?: SecureConfig;
  organizations?: Organization[];
  permissions?: Record<
    string,
    {
      resource: Resources;
      action: Action;
    }
  >;
}
//should not create application route here only accept props from parent
const SecureAppClient = ({
  children,
  config,
  organizations,
  permissions = {},
}: SecureAppClientProps) => {
  const tenantSecurity = new TenantSecurity(organizations ?? []);
  //config pass to authservice and call authentication server there
  //later after start real work for leave as it is
  // const authService=new AuthService(config)
  return (
    <>
      <AuthProvider>
        {/* doesnot care where organizations are useful for another app too */}
        <OrganizationProvider organizations={organizations ?? []}>
          {" "}
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                element={
                  <SecureCellRoute
                    permissions={permissions}
                    tenantSecurity={tenantSecurity}
                  />
                }
              >
                {children}
              </Route>
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
          </BrowserRouter>
        </OrganizationProvider>
      </AuthProvider>
    </>
  );
};

export default SecureAppClient;
