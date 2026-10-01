import { Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import SecureAppClient from "./utils/secureclient/SecureAppClient";
import Pms from "./pages/pms/Pms";
import Details from "./pages/pms/Details";
import Arrivals from "./pages/pms/operations/list/Arrivals";
import Cash from "./pages/pms/operations/list/Cash";
import Activate from "./pages/pms/activate/Activate";
import ActivateDetails from "./pages/pms/activate/ActivateDetails";
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
import Dash from "./pages/hotel/Dash";
import Rooms from "./component/Rooms";
import Reservation from "./pages/hotel/Reservation";
import Hoteldetails from "./pages/hotel/Hoteldetails";
import Hotel from "./pages/hotel/Hotel";
import CateringLayout from "./pages/catering/CateringLayout";
import Catering from "./pages/catering/Catering";
import Report from "./reports/Report";
import TestComponent from "./pages/test/TestComponent";
import Activity from "./pages/activity-log/Activity";

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
        <SecureAppClient config={secureConfig}>
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
          {/* //PMS */}
          <Route path="/:organizationSlug/pms" element={<Pms />}>
            <Route index element={<Details />} />
            <Route path="operations/arrivals" element={<Arrivals />} />
            <Route path="operations/cash" element={<Cash />} />
            <Route path="activate" element={<Activate />}>
              <Route path=":activeId/:childId" element={<ActivateDetails />} />
            </Route>
          </Route>
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
