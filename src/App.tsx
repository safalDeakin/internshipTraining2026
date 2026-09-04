// import ListHeader from "./components/ListHeader"
// import ListHeroSection from "./components/ListHeroSection"


// const App = () => {
//   return (
//     <>
//       <div className="page">
//         <h1>List-One Line</h1>
//         <div className="main-card">
//           <ListHeader />
//           <ListHeroSection />
//         </div>
//       </div>
//     </>
//   )
// }


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/routing/Navbar";
import Restaurant from "./component/routing/restaurant/Restaurant";
import Hotel from "./component/routing/hotel/Hotel";
import Dashboard from "./component/routing/Dashboard";
import Dash from "./component/routing/hotel/Dash";
import Rooms from "./component/routing/hotel/Rooms";
import Reservation from "./component/routing/hotel/Reservation";
import ResDash from "./component/routing/restaurant/ResDash";
import Hoteldetails from "./component/routing/hotel/Hoteldetails";
import Login from "./component/role-based/Login";
import RoleRoute from "./component/role-based/RoleRoute";
import Stock from "./component/routing/restaurant/Stock";
import Offer from "./component/routing/restaurant/Offer";
import Sales from "./component/routing/restaurant/Sales";
import Catering from "./component/routing/catering/Catering";
import Unauthorized from "./component/routing/unauthorized/Unauthorized";
import KitchenOrders from "./component/routing/restaurant/KitchenOrders";
import { RepoProvider } from "./context/RepoContext";
import { Repo } from "./repo/Repo";
import { useMemo } from "react";
import { ReservationStateHolder } from "./states/ReservationStateHolder";
import { KitchenStateHolder } from "./states/KitchenStateHolder";
import { mockKitchenOrders, mockReservations } from "./data/mockReservations";

const App = () => {
  const repo = useMemo(() => {
    const repo = new Repo();

    repo.setReservations(mockReservations);
    repo.setKitchenOrders(mockKitchenOrders);

    return repo;
  }
    , []);
  const kitchenState = useMemo(() => new KitchenStateHolder(repo), [repo]);
  const reservationState = useMemo(() => new ReservationStateHolder(repo), [repo]);

  return (
    <>
      <div className="bg-blue-50 p-10">
        <BrowserRouter>
          <RepoProvider repo={repo}
            kitchenState={kitchenState}
            reservationState={reservationState}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              {/* Restaurant */}
              <Route
                element={
                  <RoleRoute allowedRoles={["ADMIN", "RESTAURANT_MANAGER"]} />
                }
              >
                <Route path="/restaurant" element={<Restaurant />}>
                  <Route index element={<ResDash />} />
                  <Route path="sales" element={<Sales />} />
                  <Route path="stock" element={<Stock />} />
                  <Route path="offer" element={<Offer />} />
                  <Route path="kitchenOrders" element={<KitchenOrders />} />
                </Route>
              </Route>
              {/* //hotel */}
              <Route
                element={<RoleRoute allowedRoles={["ADMIN", "HOTEL_MANAGER"]} />}
              >
                <Route path="/accomodation" element={<Hotel />}>
                  <Route index element={<Dash />} />
                  <Route path="room" element={<Rooms />} />
                  <Route path="reservation" element={<Reservation />}>
                    <Route path=":id" element={<Hoteldetails />} />
                  </Route>
                </Route>
              </Route>
              <Route path="/catering" element={<Catering />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
          </RepoProvider>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
