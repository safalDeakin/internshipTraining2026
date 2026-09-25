import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurant from "./pages/restaurant/Restaurant";
import Hotel from "./pages/hotel/Hotel";
import Dashboard from "./component/Dashboard";
import Dash from "./pages/hotel/Dash";
import Reservation from "./pages/hotel/Reservation";
import ResDash from "./pages/restaurant/ResDash";
import Hoteldetails from "./pages/hotel/Hoteldetails";
import Login from "../src/component/Login";
import Stock from "./pages/restaurant/Stock";
import Sales from "./pages/restaurant/Sales";
import Catering from "./pages/catering/Catering";
import Unauthorized from "./component/Unauthorized";
import KitchenOrders from "./pages/restaurant/KitchenOrders";
import { RepoProvider } from "./context/RepoContext";
import { Repo } from "./repo/Repo";
import { useMemo } from "react";
import { ReservationStateHolder } from "./states/ReservationStateHolder";
import { KitchenStateHolder } from "./states/KitchenStateHolder";
import { mockKitchenOrders, reservations } from "./data/mockReservations";
import Arrivals from "./pages/pms/operations/list/Arrivals";
import Cash from "./pages/pms/operations/list/Cash";
import ActivateDetails from "./pages/pms/activate/ActivateDetails";
import Offers from "./components/Offers";
import ReservationReport from "./reports/ReservationReport";
import { ReservationReportStateHolder } from "./states/ReservationReportStateHolder";
import ProtectedRoute from "./component/ProtectedRoute";
import SignUp from "./component/SignUp";
import Rooms from "./component/Rooms";
import Products from "./pages/restaurant/Products";
import SecureCellRoute from "./security/SecureCellRoute";
import { ACTIONS, RESOURCES } from "./security/permission";
import Pms from "./pages/pms/Pms";
import Activate from "./pages/pms/activate/Activate";
import CateringLayout from "./pages/catering/CateringLayout";
import Details from "./pages/pms/Details";
import Pricelist from "./pages/restaurant/Pricelist";

const App = () => {
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
    <BrowserRouter>
      <RepoProvider
        repo={repo}
        kitchenState={kitchenState}
        reservationState={reservationState}
        reservationReportState={reservationReportState}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            {/* //PMS */}
            <Route
              path="/:organizationSlug/pms"
              element={
                <SecureCellRoute
                  resource={RESOURCES.PMS}
                  action={ACTIONS.VIEW}
                />
              }
            >
              <Route path="" element={<Pms />}>
                <Route index element={<Details />} />
                <Route path="operations/arrivals" element={<Arrivals />} />
                <Route path="operations/cash" element={<Cash />} />
                <Route path="activate" element={<Activate />}>
                  <Route
                    path=":activeId/:childId"
                    element={<ActivateDetails />}
                  />
                </Route>
              </Route>
            </Route>

            {/* Restaurant */}
            <Route
              path="/:organizationSlug/restaurant"
              element={
                <SecureCellRoute
                  resource={RESOURCES.RESTAURANT}
                  action={ACTIONS.VIEW}
                />
              }
            >
              <Route element={<Restaurant />}>
                <Route index element={<ResDash />} />
                <Route path="sales" element={<Sales />} />
                <Route path="price" element={<Pricelist />} />
                <Route path="stock" element={<Stock />} />
                <Route path="offer" element={<Offers />} />
                <Route path="products" element={<Products />} />
                <Route path="kitchenOrders" element={<KitchenOrders />} />
              </Route>
            </Route>
            {/* //hotel */}
            <Route
              path="/:organizationSlug/accomodation"
              element={
                <SecureCellRoute
                  resource={RESOURCES.ACCOMMODATION}
                  action={ACTIONS.VIEW}
                />
              }
            >
              <Route element={<Hotel />}>
                <Route index element={<Dash />} />
                <Route path="room" element={<Rooms />} />
                <Route path="reservation" element={<Reservation />}>
                  <Route path=":id" element={<Hoteldetails />} />
                </Route>
              </Route>
            </Route>
            <Route
              path="/:organizationSlug/catering"
              element={
                <SecureCellRoute
                  resource={RESOURCES.CATERING}
                  action={ACTIONS.VIEW}
                />
              }
            >
              <Route element={<CateringLayout />}>
                <Route index element={<Catering />} />
              </Route>
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* Reservation Report */}
            <Route
              path="/:organizationSlug/reservation-report"
              element={<ReservationReport />}
            />
          </Route>
          <Route path="/signin" element={<SignUp />} />
        </Routes>
      </RepoProvider>
    </BrowserRouter>
  );
};

export default App;
