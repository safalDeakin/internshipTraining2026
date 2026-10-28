//author:shrajja
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import SecureCellRoute from "./SecureCellRoute";
import type { ReactNode } from "react";
import Unauthorized from "./pages/Unauthorized";
import type { Action, Resources } from "./services/models/permission";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import Navbar from "./pages/Navbar";
import type { AppRoute } from "../../routes/appRoutes";
import RootRedirect from "./pages/RouteRedirect";

interface SecureConfig {
  authServerUrl: string;
  clientId: string;
  pubKey: string;
  // defaultOrganization?: string;
}

//things that application must give your package.
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
  routes: AppRoute[];
}
const OrganizationLayout = ({ routes }: { routes: AppRoute[] }) => {
  return (
    <>
      <Navbar routes={routes} /> <Outlet />{" "}
    </>
  );
};

const SecureAppClient = ({
  children,
  config,
  permissions = {},
  routes,
}: SecureAppClientProps) => {
  console.log("Loading Secure App Client: Setting config -> " + config);

  const renderRoutes = (routes: AppRoute[]): ReactNode => {
    return routes.map((route, index) => {
      if (route.index) {
        return <Route key={`index-${index}`} index element={route.element} />;
      }
      return (
        <Route
          key={route.path ?? `route-${index}`}
          path={route.path}
          element={route.element}
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    });
  };

  //config pass to authservice and call authentication server there
  //later after start real work for leave as it is
  // const authService=new AuthService(config)
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route
              path=":organizationSlug"
              element={<SecureCellRoute permissions={permissions} />}
            >
              <Route element={<OrganizationLayout routes={routes} />}>
                {" "}
                {renderRoutes(routes)}{" "}
              </Route>
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default SecureAppClient;
