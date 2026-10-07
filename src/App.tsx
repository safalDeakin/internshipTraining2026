
import { useMemo } from "react";
import SecureAppClient from "./utils/secureclient/SecureAppClient";

import { RepoProvider } from "./context/RepoContext";
import "./component/table/styles/tableConent.css"

import type {
  Action,
  Resources,
} from "./utils/secureclient/services/models/permission";

import { appRoutes } from "./routes/appRoutes";
import { KitchenStateHolder } from "./states/KitchenStateHolder";
import { reservations } from "./data/mockReservations";


import { Repo } from "./repo/Repo";
import { ReservationStateHolder } from "./states/ReservationStateHolder";
import { ReservationReportStateHolder } from "./states/ReservationReportStateHolder";
import { mockKitchenOrders } from "./data/mockReservations";

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



  const repo = useMemo(() => {
    const repository = new Repo();

    repository.setReservations(reservations);
    repository.setKitchenOrders(mockKitchenOrders);

    return repository;
  }, []);
  const kitchenState = useMemo(() => new KitchenStateHolder(repo), [repo]);

  const reservationState = useMemo(
    () => new ReservationStateHolder(repo),
    [repo],
  );

  const reservationReportState = useMemo(
    () => new ReservationReportStateHolder(repo),
    [repo],
  );

  //starts SEcureAppclient package from here
  //SecureAppClient handles authentication,authorization,navigation
  return (

    <>
      <RepoProvider
        repo={repo}
        kitchenState={kitchenState}
        reservationState={reservationState}
        reservationReportState={reservationReportState}
      >
        <SecureAppClient
          config={secureConfig}
          permissions={permissions}
          routes={appRoutes}
        />
      </RepoProvider>
    </>
  );
};

export default App;
