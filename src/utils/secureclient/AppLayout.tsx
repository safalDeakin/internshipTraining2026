import { Outlet } from "react-router-dom";
import Navbar from "../../component/Navbar";

const AppLayout = () => {
  console.log("AppLayout rendered");
  console.log("Navbar should render now");
  return (
    <div>
      <Navbar />
      <div>
        {/* {nav === "hotel" && <HotelNav />} */}
        {/* {nav === "restaurant" && <RestaurantNav />} */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
