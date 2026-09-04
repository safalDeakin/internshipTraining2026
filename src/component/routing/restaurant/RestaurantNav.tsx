import { Gauge } from "lucide-react";
import { NavLink } from "react-router-dom";

const RestaurantNav = () => {
  return (
    <nav className="flex flex-col gap-5 p-4 bg-white">
      <NavLink
        to="/restaurant"
        className={({ isActive }) =>
          ` font-bold flex items-center gap-2 text-sm ${isActive ? "text-blue-600" : "text-black"}`
        }
      >
        Restaurant
      </NavLink>
      <div className="flex flex-col pl-2">
        <NavLink
          to="/restaurant/sales"
          className={({ isActive }) =>
            ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          }
        >
          <span>
            <Gauge className="w-4 h-4" />
          </span>{" "}
          sales offer
        </NavLink>
        <NavLink
          to="/restaurant/offer"
          className={({ isActive }) =>
            ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          }
        >
          <Gauge className="w-4 h-4" />
          Offers
        </NavLink>
        <NavLink
          to="/restaurant/stock"
          className={({ isActive }) =>
            `flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          }
        >
          <Gauge className="w-4 h-4" />
          Stock Clearence
        </NavLink>

        <NavLink
          to="/restaurant/kitchenOrders"
          className={({ isActive }) =>
            `flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          }
        >
          <Gauge className="w-4 h-4" />
          Kitchen Orders
        </NavLink>
      </div>
    </nav>
  );
};

export default RestaurantNav;
