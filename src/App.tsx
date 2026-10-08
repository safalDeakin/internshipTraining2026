import { appRoutes } from "./routes/appRoutes";
import SecureAppClient from "./utils/secureclient/SecureAppClient";
import { permissions } from "./utils/secureclient/services/models/viewpermission";
// import { useMemo } from "react";
// import { Repo } from "./repo/Repo";

const App = () => {
  const secureConfig = {
    authServerUrl: "https://auth.myspace.com",
    clientId: "pms",
    pubKey: "as",
  };

  //starts SEcureAppclient package from here
  //SecureAppClient handles authentication,authorization,navigation
  return (
    <>
      <SecureAppClient
        config={secureConfig}
        permissions={permissions}
        routes={appRoutes}
      />
    </>
  );
};

export default App;
