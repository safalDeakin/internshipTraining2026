import RestaurantNav from "./RestaurantNav";
import { Outlet } from "react-router-dom";

const Restaurant = () => {
  return (
    <div className="md:grid grid-cols-[1fr_3fr]">
      <RestaurantNav />
      <main className="p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Restaurant;
//grid grid-cols-[1fr_4fr] pt-5 gap-10
