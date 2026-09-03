import RestaurantNav from "./RestaurantNav";
import { Outlet } from "react-router-dom";

const Restaurant = () => {
  return (
    <div className="grid grid-cols-[1fr_3fr] pt-5 gap-10 ">
      <RestaurantNav />
      <main className="p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Restaurant;
