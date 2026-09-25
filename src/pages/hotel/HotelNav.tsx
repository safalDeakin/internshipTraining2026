import {
  BrushCleaning,
  Building,
  ChevronDown,
  ClipboardList,
  Gauge,
  Hotel,
  Settings,
  SquareChevronUp,
  Tag,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useOrganization } from "../../context/OrganizationContext";
import { useState } from "react";
interface AccomodationNavbarProps {
  closeBar: () => void;
}
const linkBase = "flex items-center gap-2 px-3 py-2 rounded-xl text-sm";
const linkActive = "bg-blue-100 text-blue-700";
const linkInactive = "text-blue-950 hover:bg-blue-50";
const HotelNav = ({ closeBar }: AccomodationNavbarProps) => {
  const { organization } = useOrganization();
  const [isAccomodationOpen, setIsAccomodationOpen] = useState(false);
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? linkActive : linkInactive}`;
  return (
    <nav className="flex h-full w-full max-h-screen flex-col bg-white p-3 overscroll-contain">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="relative flex w-full items-center gap-1 px-1 py-2">
          <NavLink
            to={`/${organization?.slug}/accomodation`}
            onClick={closeBar}
            className={({ isActive }) =>
              `text-lg flex items-center gap-2 ${isActive ? "text-blue-800" : "text-white"}`
            }
          >
            <Hotel className="" />
            <span>Hotel</span>
          </NavLink>
          <button
            type="button"
            className="flex-shrink-0"
            onClick={() => setIsAccomodationOpen(!isAccomodationOpen)}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isAccomodationOpen ? "rotate-180 text-blue-500" : ""}`}
            />
          </button>
          {isAccomodationOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 flex h-40 w-full flex-col gap-1 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <div className="flex flex-col gap-1 w-full">
                <p className="text-gray-600 text-medium flex items-center gap-2 border-b border-gray-200">
                  <SquareChevronUp className="w-4 h-4 text-gray-500" />
                  <span>Menu</span>
                </p>
                <NavLink
                  to={`/${organization?.slug}/restaurant/products`}
                  onClick={closeBar}
                  // className="flex items-center gap-2 "
                  className={getLinkClass}
                >
                  <Tag className="w-4 h-4" />
                  Products
                </NavLink>
                <NavLink
                  to={`/${organization?.slug}/restaurant/price`}
                  onClick={closeBar}
                  // className="flex items-center gap-2"
                  className={getLinkClass}
                >
                  <ClipboardList className="w-4 h-4" />
                  Pricelist
                </NavLink>
                <NavLink
                  to={`/${organization?.slug}/restaurant/offer`}
                  onClick={closeBar}
                  // className="flex items-center gap-2"
                  className={getLinkClass}
                >
                  <Gauge className="w-4 h-4" />
                  Offers
                </NavLink>
                <NavLink
                  to={`/${organization?.slug}/restaurant/setup`}
                  onClick={closeBar}
                  // className="flex items-center gap-2"
                  className={getLinkClass}
                >
                  <Settings className="w-4 h-4" />
                  Device Setup
                </NavLink>
              </div>
              {/* // configuration*/}
              <div className="flex flex-col gap-1 w-full">
                <p className="text-gray-600 text-medium flex items-center gap-2 border-b border-gray-200">
                  <SquareChevronUp className="w-4 h-4 text-gray-500" />
                  <span>Configuration</span>
                </p>

                <NavLink
                  to={`/${organization?.slug}/restaurant/price`}
                  onClick={closeBar}
                  // className="flex items-center gap-2"
                  className={getLinkClass}
                >
                  <ClipboardList className="w-4 h-4" />
                  User settings
                </NavLink>
                <NavLink
                  to={`/${organization?.slug}/restaurant/offer`}
                  onClick={closeBar}
                  // className="flex items-center gap-2 text-sm"
                  className={getLinkClass}
                >
                  <Gauge className="w-4 h-4" />
                  Sales Setting
                </NavLink>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-1">
          <div className="border border-gray-300 rounded-lg p-2 ">
            <BrushCleaning className="text-blue-700 w-3 h-3" />
          </div>

          <div className="border border-gray-300 rounded-lg p-2">
            <Building className="text-blue-700 w-3 h-3" />
          </div>
        </div>
      </div>
      {/* //border */}
      <div className="h-px bg-gray-100 mx-1 mb-2" />
      {/* //main */}
      <div className="flex flex-col gap-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <NavLink
          to={`/${organization?.slug}/accomodation/room`}
          onClick={closeBar}
          // className={({ isActive }) =>
          //   `flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-200" : "bg-white"}`
          // }
          className={getLinkClass}
        >
          <span>
            <Gauge className="w-4 h-4" />
          </span>{" "}
          Rooms
        </NavLink>
        <NavLink
          to={`/${organization?.slug}/accomodation/reservation`}
          onClick={closeBar}
          // className={({ isActive }) =>
          //   `flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-200" : "bg-white"}`
          // }
          className={getLinkClass}
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
