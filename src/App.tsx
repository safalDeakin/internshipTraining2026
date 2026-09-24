import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useMemo } from "react";

// Context
import { RepoProvider } from "./context/RepoContext";

// Repository
import { Repo } from "./repo/Repo";

// State Holders
import { KitchenStateHolder } from "./states/KitchenStateHolder";
import { ReservationStateHolder } from "./states/ReservationStateHolder";
import { ReservationReportStateHolder } from "./states/ReservationReportStateHolder";

// Data
import {
  mockKitchenOrders,
  reservations,
} from "./data/mockReservations";

// Layout
import Navbar from "./component/routing/Navbar";

// Common routes
import Dashboard from "./component/routing/Dashboard";
import Login from "./component/role-based/Login";
import ProtectedRoute from "./component/ProtectedRoute";
import Unauthorized from "./component/routing/unauthorized/Unauthorized";

// PMS
import Pms from "./component/pms/Pms";
import Activate from "./component/pms/activate/Activate";
import ActivateDetails from "./component/pms/activate/ActivateDetails";
import Arrivals from "./component/pms/operations/list/Arrivals";
import Cash from "./component/pms/operations/list/Cash";

// Restaurant
import Restaurant from "./component/routing/restaurant/Restaurant";
import ResDash from "./component/routing/restaurant/ResDash";
import Sales from "./component/routing/restaurant/Sales";
import Stock from "./component/routing/restaurant/Stock";
import KitchenOrders from "./component/routing/restaurant/KitchenOrders";
import Offers from "./components/Offers";

// Hotel
import Hotel from "./component/routing/hotel/Hotel";
import Dash from "./component/routing/hotel/Dash";
import Rooms from "./component/routing/hotel/Rooms";
import Reservation from "./component/routing/hotel/Reservation";
import Hoteldetails from "./component/routing/hotel/Hoteldetails";

// Catering
import Catering from "./component/routing/catering/Catering";

// Reports
// import ReservationReport from "./reports/reservation/ReservationReport";
import Report from "./reports/Report";
import PrintReservationForm from "./reports/printableData/PrintReservationForm";

// Calendar
import Render from "./component/calendar/renderItem/Render";
import ReservationCalendar from "./component/reservatoinCalendar/ReservationCalendar";


const App = () => {
  const repo = useMemo(() => {
    const repository = new Repo();

    repository.setReservations(reservations);
    repository.setKitchenOrders(mockKitchenOrders);

    return repository;
  }, []);

  const kitchenState = useMemo(
    () => new KitchenStateHolder(repo),
    [repo]
  );

  const reservationState = useMemo(
    () => new ReservationStateHolder(repo),
    [repo]
  );

  const reservationReportState = useMemo(
    () => new ReservationReportStateHolder(repo),
    [repo]
  );

  return (
    <BrowserRouter>
      <RepoProvider
        repo={repo}
        kitchenState={kitchenState}
        reservationState={reservationState}
        reservationReportState={reservationReportState}
      >
        <Navbar />

        <Routes>
          {/* =========================
              Authentication
          ========================= */}
          <Route path="/login" element={<Login />} />

          {/* =========================
              Protected Routes
          ========================= */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>

          {/* =========================
              PMS
          ========================= */}
          <Route
            path="/:organizationSlug/pms"
            element={<Pms />}
          >
            <Route index element={null} />

            <Route
              path="operations/arrivals"
              element={<Arrivals />}
            />

            <Route
              path="operations/cash"
              element={<Cash />}
            />

            <Route
              path="activate"
              element={<Activate />}
            >
              <Route
                path=":activeId/:childId"
                element={<ActivateDetails />}
              />
            </Route>
          </Route>

          {/* =========================
              Restaurant
          ========================= */}
          <Route
            path="/:organizationSlug/restaurant"
            element={<Restaurant />}
          >
            <Route index element={<ResDash />} />

            <Route
              path="sales"
              element={<Sales />}
            />

            <Route
              path="stock"
              element={<Stock />}
            />

            <Route
              path="offer"
              element={<Offers />}
            />

            <Route
              path="kitchenOrders"
              element={<KitchenOrders />}
            />
          </Route>

          {/* =========================
              Hotel / Accommodation
          ========================= */}
          <Route
            path="/:organizationSlug/accomodation"
            element={<Hotel />}
          >
            <Route index element={<Dash />} />

            <Route
              path="room"
              element={<Rooms />}
            />

            <Route
              path="reservation"
              element={<Reservation />}
            >
              <Route
                path=":id"
                element={<Hoteldetails />}
              />
            </Route>
          </Route>

          {/* =========================
              Catering
          ========================= */}
          <Route
            path="/:organizationSlug/catering"
            element={<Catering />}
          />

          {/* =========================
              Reservation Reports
          ========================= */}

          {/* Existing reservation report */}
          {/* <Route
            path="/:organizationSlug/reservation-report"
            element={<ReservationReport />}
          /> */}

          {/* Report Builder */}
          <Route
            path="/reservation-report"
            element={<Report />}
          />

          {/* Printable reservation form */}
          <Route
            path="/print-data"
            element={<PrintReservationForm />}
          />

          {/* =========================
              Reservation Calendar
          ========================= */}

          {/* Existing calendar render */}
          <Route
            path="/reservation-calender"
            element={<Render />}
          />

          {/* New reservation calendar */}
          <Route
            path="/reservation-calendar"
            element={<ReservationCalendar />}
          />

          {/* =========================
              Unauthorized
          ========================= */}
          <Route
            path="/unauthorized"
            element={<Unauthorized />}
          />
        </Routes>
      </RepoProvider>
    </BrowserRouter>
  );
};

export default App;