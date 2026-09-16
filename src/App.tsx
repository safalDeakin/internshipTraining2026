import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurant from "./component/routing/restaurant/Restaurant";
import Hotel from "./component/routing/hotel/Hotel";
import Dashboard from "./component/Dashboard";
import Dash from "./component/routing/hotel/Dash";
import Rooms from "./component/routing/hotel/Rooms";
import Reservation from "./component/routing/hotel/Reservation";
import ResDash from "./component/routing/restaurant/ResDash";
import Hoteldetails from "./component/routing/hotel/Hoteldetails";
import Login from "./component/Login";
import Stock from "./component/routing/restaurant/Stock";
import Sales from "./component/routing/restaurant/Sales";
import Catering from "./component/routing/catering/Catering";
import Unauthorized from "./component/routing/unauthorized/Unauthorized";
import KitchenOrders from "./component/routing/restaurant/KitchenOrders";
import { RepoProvider } from "./context/RepoContext";
import { Repo } from "./repo/Repo";
import { useMemo } from "react";
import { ReservationStateHolder } from "./states/ReservationStateHolder";
import { KitchenStateHolder } from "./states/KitchenStateHolder";
import { mockKitchenOrders, reservations } from "./data/mockReservations";
import Pms from "./component/pms/Pms";
import Activate from "./component/pms/activate/Activate";
import Arrivals from "./component/pms/operations/list/Arrivals";
import Cash from "./component/pms/operations/list/Cash";
import ActivateDetails from "./component/pms/activate/ActivateDetails";
import Offers from "./components/Offers";
import ReservationReport from "./reports/reservation/ReservationReport";
import { ReservationReportStateHolder } from "./states/ReservationReportStateHolder";
import ProtectedRoute from "./component/ProtectedRoute";
import SignUp from "./component/SignUp";

const App = () => {
  const user = {
    role: "ADMIN",
  };
  const repo = useMemo(() => {
    const repo = new Repo();

    repo.setReservations(reservations);
    repo.setKitchenOrders(mockKitchenOrders);

    return repo;
  }, []);
  const kitchenState = useMemo(() => new KitchenStateHolder(repo), [repo]);

  const reservationState = useMemo(
    () => new ReservationStateHolder(repo),
    [repo],
  );

  const reservationReportState = useMemo(() => {
    return new ReservationReportStateHolder(repo);
  }, [repo]);

  return (
    <>
      <div className="">
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

                <Route path="/:organizationSlug/pms" element={<Pms />}>
                  <Route index element={null} />
                  <Route path="operations/arrivals" element={<Arrivals />} />
                  <Route path="operations/cash" element={<Cash />} />
                  <Route path="activate" element={<Activate />}>
                    <Route
                      path=":activeId/:childId"
                      element={<ActivateDetails />}
                    />
                  </Route>
                </Route>

                {/* Restaurant */}
                <Route
                  path="/:organizationSlug/restaurant"
                  element={<Restaurant />}
                >
                  <Route index element={<ResDash />} />
                  <Route path="sales" element={<Sales />} />
                  <Route path="stock" element={<Stock />} />
                  <Route path="offer" element={<Offers />} />
                  <Route path="kitchenOrders" element={<KitchenOrders />} />
                </Route>
                {/* //hotel */}
                <Route
                  path="/:organizationSlug/accomodation"
                  element={<Hotel />}
                >
                  <Route index element={<Dash />} />
                  <Route path="room" element={<Rooms />} />
                  <Route path="reservation" element={<Reservation />}>
                    <Route path=":id" element={<Hoteldetails />} />
                  </Route>
                </Route>
                <Route
                  path="/:organizationSlug/catering"
                  element={<Catering />}
                />
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
      </div>
    </>
  );
};

export default App;
