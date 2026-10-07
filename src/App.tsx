import { Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import {useMemo} from "react";
import SecureAppClient from "./utils/secureclient/SecureAppClient";
import ResDash from "./pages/restaurant/ResDash";
import Sales from "./pages/restaurant/pages/Sales";
import Pricelist from "./pages/restaurant/pages/Pricelist";
import Stock from "./pages/restaurant/pages/Stock";
import Offers from "./components/Offers";
import Products from "./pages/restaurant/pages/Products";
import KitchenOrders from "./pages/restaurant/pages/KitchenOrders";
import { RepoProvider } from "./context/RepoContext";
import "./component/table/styles/tableConent.css"

// Hotel

// Reports
// import ReservationReport from "./reports/reservation/ReservationReport";
import Report from "./pages/reports/Report";
import TestComponent from "./pages/test/TestComponent";
import Activity from "./pages/activity-log/Activity";
import type {
  Action,
  Resources,
} from "./utils/secureclient/services/models/permission";
import Dash from "./pages/hotel/Dash";
import Hoteldetails from "./pages/hotel/pages/Hoteldetails";
import RestaurantLayout from "./pages/restaurant/RestaurantLayout";
import HotelLayout from "./pages/hotel/HotelLayout";
import Rooms from "./pages/hotel/pages/Rooms";
// import Reservation from "./pages/hotel/pages/Reservation";
import FinalAllReservationPage from "./pages/hotel/pages/FinalAllReservationPage";
import ReservationCalendar from "./pages/hotel/pages/ReservationCalendar";
import { appRoutes } from "./routes/appRoutes";
import { repo } from "./repo/Repo";
import { KitchenStateHolder } from "./states/KitchenStateHolder";
import { reservations } from "./data/mockReservations";


// import SecureAppClient from "./utils/secureclient/SecureAppClient";
// import { useMemo } from "react";
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
