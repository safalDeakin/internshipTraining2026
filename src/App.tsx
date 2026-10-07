import type {
  Action,
  Resources,
} from "./utils/secureclient/services/models/permission";
import { appRoutes } from "./utils/secureclient/services/routes/appRoutes";
import SecureAppClient from "./utils/secureclient/SecureAppClient";
// import { useMemo } from "react";
// import { Repo } from "./repo/Repo";

const permissions: Record<
  string,
  {
    resource: Resources;
    action: Action;
  }
> = {
  restaurant: {
    resource: "restaurant",
    action: "view",
  },

  accomodation: {
    resource: "accommodation",
    action: "view",
  },

  "reservation-report": {
    resource: "reports",
    action: "view",
  },

  "activity-log": {
    resource: "activity-logs",
    action: "view",
  },
  //path
  "test-component": {
    resource: "test-component",
    action: "view",
  },
};
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
