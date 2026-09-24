import { ChevronDown, Gauge } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useOrganization } from "../../context/OrganizationContext";
import { useState } from "react";
interface AccomodationNavbarProps {
  closeBar: () => void;
}
const HotelNav = ({ closeBar }: AccomodationNavbarProps) => {
  const { organization } = useOrganization();
  const [isAccomodationOpen, setIsAccomodationOpen] = useState(false);
  return (
    <nav className="flex h-full max-h-screen flex-col bg-white p-3 overscroll-contain">
      <div className="relative flex items-center justify-between px-1 py-2">
        <NavLink
          to={`/${organization?.slug}/accomodation`}
          onClick={closeBar}
          className={({ isActive }) =>
            `${isActive ? "text-blue-600" : "text-white"}`
          }
        >
          Accomodation
        </NavLink>
        <button onClick={() => setIsAccomodationOpen(!isAccomodationOpen)}>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isAccomodationOpen ? "rotate-180 text-blue-500" : ""}`}
          />
        </button>
        {isAccomodationOpen && (
          <div className="absolute left-0 top-full z-50 mt-1 flex h-40 w-full flex-col gap-1 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div>
              <p className="text-xs font-bold text-bold">Menu</p>
              <NavLink
                to={`/${organization?.slug}/restaurant/products`}
                onClick={closeBar}
                className={({ isActive }) =>
                  ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
                }
              >
                Products{" "}
              </NavLink>
              <NavLink
                to={`/${organization?.slug}/restaurant/price`}
                className={({ isActive }) =>
                  ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
                }
                onClick={closeBar}
              >
                Pricelist
              </NavLink>
              <NavLink
                to={`/${organization?.slug}/restaurant/offer`}
                onClick={closeBar}
                className={({ isActive }) =>
                  ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
                }
              >
                Offers
              </NavLink>
              <NavLink
                to={`/${organization?.slug}/restaurant/setup`}
                onClick={closeBar}
                className={({ isActive }) =>
                  ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
                }
              >
                DeviceSetup
              </NavLink>
            </div>
            <div>
              <p className="text-xs font-bold text-bold">Configuration</p>
              <NavLink
                to={`/${organization?.slug}/restaurant/products`}
                onClick={closeBar}
                className={({ isActive }) =>
                  ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
                }
              >
                Settings
              </NavLink>
              <NavLink
                to={`/${organization?.slug}/restaurant/price`}
                className={({ isActive }) =>
                  ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
                }
                onClick={closeBar}
              >
                Pricelist
              </NavLink>
              <NavLink
                to={`/${organization?.slug}/restaurant/offer`}
                onClick={closeBar}
                className={({ isActive }) =>
                  ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
                }
              >
                Sales Setting
              </NavLink>
              <NavLink
                to={`/${organization?.slug}/restaurant/setup`}
                onClick={closeBar}
                className={({ isActive }) =>
                  ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
                }
              >
                User Setting
              </NavLink>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <NavLink
          to={`/${organization?.slug}/accomodation/room`}
          onClick={closeBar}
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
          onClick={closeBar}
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
    </nav>
  );
};

export default HotelNav;
