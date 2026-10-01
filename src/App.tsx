import { Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import SecureAppClient from "./utils/secureclient/SecureAppClient";
import Restaurant from "./pages/restaurant/Restaurant";
import ResDash from "./pages/restaurant/ResDash";
import Sales from "./pages/restaurant/Sales";
import Pricelist from "./pages/restaurant/Pricelist";
import Stock from "./pages/restaurant/Stock";
import Offers from "./components/Offers";
import Products from "./pages/restaurant/Products";
import KitchenOrders from "./pages/restaurant/KitchenOrders";
import { RepoProvider } from "./context/RepoContext";
import { useMemo } from "react";
import { Repo } from "./repo/Repo";
import { mockKitchenOrders, reservations } from "./data/mockReservations";
import { KitchenStateHolder } from "./states/KitchenStateHolder";
import { ReservationStateHolder } from "./states/ReservationStateHolder";
import { ReservationReportStateHolder } from "./states/ReservationReportStateHolder";
import Report from "./reports/Report";
import TestComponent from "./pages/test/TestComponent";
import Activity from "./pages/activity-log/Activity";
import type { Action, Resources } from "./utils/secureclient/models/permission";
import Hotel from "./pages/hotel/Hotel";
import Dash from "./pages/hotel/Dash";
import Rooms from "./pages/hotel/Rooms";
import Reservation from "./pages/hotel/Reservation";
import ReservationDetail from "./reports/report/ReservationDetail";
import Hoteldetails from "./pages/hotel/Hoteldetails";

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
  "test-component": {
    resource: "test-component",
    action: "view",
  },
  //  "activity-log": {
  //   resource: "activity-logs",
  //   action: "view",
  // },
};
const App = () => {
  const secureConfig = {
    authServerUrl: "https://auth.myspace.com",
    clientId: " pms",
    pubKey: "as",
  };
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
    <div>
      <RepoProvider
        repo={repo}
        kitchenState={kitchenState}
        reservationState={reservationState}
        reservationReportState={reservationReportState}
      >
        <SecureAppClient config={secureConfig} permissions={permissions}>
          <Route path="/" element={<Dashboard />} />
          {/* //test compoent */}
          <Route
            path="/:organizationSlug/test-component"
            element={<TestComponent />}
          />
          {/* //activuty */}
          <Route
            path="/:organizationSlug/activity-log"
            element={<Activity />}
          />
          {/* hotel */}
          <Route path="/:organizationSlug/accomodation" element={<Hotel />}>
            <Route index element={<Dash />} />

            <Route path="room" element={<Rooms />} />

            <Route path="reservation" element={<Reservation />}>
              <Route path=":id" element={<Hoteldetails />} />
            </Route>
          </Route>
          {/* //PMS */}

          {/* <Route path="/:organizationSlug/pms" element={<Pms />}>
            <Route index element={<Details />} />
            <Route path="operations/arrivals" element={<Arrivals />} />
            <Route path="operations/cash" element={<Cash />} />
            <Route path="activate" element={<Activate />}>
              <Route path=":activeId/:childId" element={<ActivateDetails />} />
            </Route>
          </Route> */}
          {/* Restaurant */}
          <Route path="/:organizationSlug/restaurant" element={<Restaurant />}>
            <Route index element={<ResDash />} />
            <Route path="sales" element={<Sales />} />
            <Route path="price" element={<Pricelist />} />
            <Route path="stock" element={<Stock />} />
            <Route path="offer" element={<Offers />} />
            <Route path="products" element={<Products />} />
            <Route path="kitchenOrders" element={<KitchenOrders />} />
          </Route>

          {/* report */}
          <Route
            path="/:organizationSlug/reservation-report"
            element={<Report />}
          />
          {/* calender */}
        </SecureAppClient>
      </RepoProvider>
    </div>
  );
};

export default App;
