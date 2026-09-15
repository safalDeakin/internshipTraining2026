import { Gauge } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useOrganization } from "../../../context/OrganizationContext";

const HotelNav = () => {
  const { organization } = useOrganization();
  return (
    <div className="flex flex-col gap-5 p-4 bg-white">
      <NavLink
        to={`/${organization?.slug}/accomodation`}
        className={({ isActive }) =>
          `${isActive ? "text-blue-600" : "text-white"}`
        }
      >
        Accomodation
      </NavLink>
      <div className="flex flex-col pl-2">
        <NavLink
          to={`/${organization?.slug}/accomodation/room`}
          className={({ isActive }) =>
            `flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-200" : "bg-white"}`
          }
        >
          <span>
            <Gauge className="w-4 h-4" />
          </span>{" "}
          Rooms
        </NavLink>
        <NavLink
          to={`/${organization?.slug}/accomodation/reservation`}
          className={({ isActive }) =>
            `flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-200" : "bg-white"}`
          }
        >
          <span>
            <Gauge className="w-4 h-4" />
          </span>{" "}
          Reservation
        </NavLink>
      </div>
    </div>
  );
};

export default HotelNav;
