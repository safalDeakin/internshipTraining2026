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

  // const repo = useMemo(() => {
  //   const repository = new Repo();

  //   repository.setReservations(reservations);
  //   repository.setKitchenOrders(mockKitchenOrders);

  //   return repository;
  // }, []);
  // const kitchenState = useMemo(() => new KitchenStateHolder(repo), [repo]);

  // const reservationState = useMemo(
  //   () => new ReservationStateHolder(repo),
  //   [repo],
  // );

  // const reservationReportState = useMemo(
  //   () => new ReservationReportStateHolder(repo),
  //   [repo],
  // );

  //starts SEcureAppclient package from here
  //SecureAppClient handles authentication,authorization,navigation
  return (
    <>
      {/* <RepoProvider
        repo={repo}
        kitchenState={kitchenState}
        reservationState={reservationState}
        reservationReportState={reservationReportState}
      > */}
      <SecureAppClient
        config={secureConfig}
        permissions={permissions}
        routes={appRoutes}
      />
      {/* </RepoProvider> */}
    </>
  );
};

export default App;
