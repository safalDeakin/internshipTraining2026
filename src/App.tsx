import { Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import SecureAppClient from "./utils/secureclient/SecureAppClient";
import ResDash from "./pages/restaurant/ResDash";
import Sales from "./pages/restaurant/pages/Sales";
import Pricelist from "./pages/restaurant/pages/Pricelist";
import Stock from "./pages/restaurant/pages/Stock";
import Offers from "./components/Offers";
import Products from "./pages/restaurant/pages/Products";
import KitchenOrders from "./pages/restaurant/pages/KitchenOrders";
import { RepoProvider } from "./context/RepoContext";
import { useMemo } from "react";
import { Repo } from "./repo/Repo";
import { mockKitchenOrders, reservations } from "./data/mockReservations";
import { KitchenStateHolder } from "./states/KitchenStateHolder";
import { ReservationStateHolder } from "./states/ReservationStateHolder";
import { ReservationReportStateHolder } from "./states/ReservationReportStateHolder";
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
          <Route path="" element={<Dashboard />} />

          <Route path="test-component" element={<TestComponent />} />

          <Route path="activity-log" element={<Activity />} />

          <Route path="accomodation" element={<HotelLayout />}>
            <Route index element={<Dash />} />
            <Route path="room" element={<Rooms />} />

            <Route path="reservation" element={<FinalAllReservationPage />}>
              <Route path=":id" element={<Hoteldetails />} />
            </Route>

            <Route path="reservation-calendar" element={<ReservationCalendar />} />
          </Route>

          <Route path="restaurant" element={<RestaurantLayout />}>
            <Route index element={<ResDash />} />
            <Route path="sales" element={<Sales />} />
            <Route path="price" element={<Pricelist />} />
            <Route path="stock" element={<Stock />} />
            <Route path="offer" element={<Offers />} />
            <Route path="products" element={<Products />} />
            <Route path="kitchenOrders" element={<KitchenOrders />} />
          </Route>

          <Route path="reservation-report" element={<Report />} />
        </SecureAppClient >
        {/* =========================
              Reservation Reports
          ========================= */}

        {/* Existing reservation report */}
        {/* <Route
            path="/:organizationSlug/reservation-report"
            element={<ReservationReport />}
          /> */}

        {/* Report Builder */}
        {/* <Route
            path="/:organizationSlug/reservation-report"
            element={<Report />}
          /> */}

        {/* Printable reservation form */}
        {/* <Route
            path="/print-data"
            element={<PrintReservationForm />}
          /> */}

        {/* =========================
              Reservation Calendar
          ========================= */}

        {/* Existing calendar render */}
        {/* <Route
            path="/reservation-calender"
            element={<Render />}
          /> */}

        {/* New reservation calendar */}
        {/* <Route
            path="/:organizationSlug/reservation-calendar"
            element={<ReservationCalendar />}
          /> */}

        {/* =========================
              Unauthorized
          ========================= */}
        {/* <Route
            path="/unauthorized"
            element={<Unauthorized />}
          /> */}

        {/**Table Content */}
        {/* <Route
            path="/reservation-table"
            element={<ItemsPage />}
          /> */}

        {/**For Event calendar */}
        {/* <Route
            path="/calendar"
            element={<CalendarRenderer />}
          /> */}

        {/*For popup Setting*/}
        {/* <Route
            path="/popupSetting"
            element={<SettingRenderer />}
          /> */}


        {/**For All Reservation
           */}

        {/* <Route
            path="/all-reservation"
            element={<FinalApp />}
          /> */}


        {/**For Room Detail*/}
        {/* <Route
            path="/room-detail"
            element={<RoomDetailRenderer />}
          />
        </Routes> */}


      </RepoProvider >
    </div >
  );
};

export default App;
