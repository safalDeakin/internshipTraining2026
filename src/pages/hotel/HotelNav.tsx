import {
  BrushCleaning,
  Building,
  ChevronDown,
  ClipboardList,
  Gauge,
  Hotel,
  ListChevronsDownUp,
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
const linkActive = " text-blue-800";
const linkInactive = "text-blue-950 hover:bg-blue-50";
const HotelNav = ({ closeBar }: AccomodationNavbarProps) => {
  const { organization } = useOrganization();
  const [isAccomodationOpen, setIsAccomodationOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<
    ("rooms" | "reservation" | "frontdesk")[]
  >([]);
  const [activeSubItem, setActiveSubItem] = useState<{
    menu: "rooms" | "reservation" | "frontdesk";
    key: string;
  } | null>(null);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? linkActive : linkInactive}`;

  const getSubLinkClass = (
    menu: "rooms" | "reservation" | "frontdesk",
    key: string,
  ) => {
    const isSelected =
      activeSubItem?.menu === menu && activeSubItem?.key === key;
    return `${linkBase} ${isSelected ? linkActive : linkInactive}`;
  };

  const toggleSubMenu = (menu: "rooms" | "reservation" | "frontdesk") => {
    setOpenSubMenus((current) =>
      current.includes(menu)
        ? current.filter((item) => item !== menu)
        : [...current, menu],
    );
  };
  const handleSubItemClick = (
    menu: "rooms" | "reservation" | "frontdesk",
    key: string,
  ) => {
    setActiveSubItem({ menu, key });
    closeBar();
  };

  return (
    <nav className="flex h-full w-full max-h-screen flex-col bg-white p-3">
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
            <div className="absolute left-0 top-full z-50 mt-1 flex h-auto w-full flex-col gap-1 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg">
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
        <div className="flex justify-between gap-4">
          <div className="border border-gray-300 rounded-lg p-2 ">
            <BrushCleaning className="text-blue-700 w-4 h-4" />
          </div>

          <div className="border border-gray-300 rounded-lg p-2">
            <Building className="text-blue-700 w-4 h-4" />
          </div>
        </div>
      </div>
      {/* //border */}
      <div className="h-px bg-gray-100 mx-1 mb-2" />
      {/* //main */}
      <div className="flex flex-col gap-1 pr-1">
        <div className="w-full">
          <button
            type="button"
            onClick={() => toggleSubMenu("frontdesk")}
            className={`flex items-center gap-2 py-2 rounded-xl w-full ${openSubMenus.includes("frontdesk") ? linkActive : linkInactive}`}
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${openSubMenus.includes("frontdesk") ? "rotate-180 text-blue-500" : ""}`}
            />
            <span>Front-Desk</span>
          </button>
          {openSubMenus.includes("frontdesk") && (
            <div className=" mt-1 flex w-full flex-col gap-1 border-b border-gray-100 bg-white p-1.5">
              <NavLink
                to={`/${organization?.slug}/accomodation/room`}
                onClick={() => handleSubItemClick("frontdesk", "guestRequest")}
                className={() => getSubLinkClass("frontdesk", "guestRequest")}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <p className="flex items-center gap-2">
                    <ListChevronsDownUp className="h-4 w-4" />
                    <span>Guest Request</span>
                  </p>
                  <p>(5)</p>
                </div>
              </NavLink>
              <NavLink
                to={`/${organization?.slug}/accomodation/room`}
                onClick={() => handleSubItemClick("frontdesk", "arrivals")}
                className={() => getSubLinkClass("frontdesk", "arrivals")}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <p className="flex items-center gap-2">
                    <ListChevronsDownUp className="h-4 w-4" />
                    <span>Arrivals</span>
                  </p>
                  <p>(5)</p>
                </div>
              </NavLink>
              <NavLink
                to={`/${organization?.slug}/accomodation/room`}
                onClick={() => handleSubItemClick("frontdesk", "inHouse")}
                className={() => getSubLinkClass("frontdesk", "inHouse")}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <p className="flex items-center gap-2">
                    <ListChevronsDownUp className="h-4 w-4" />
                    <span>In-House</span>
                  </p>
                  <p>(5)</p>
                </div>
              </NavLink>
              <NavLink
                to={`/${organization?.slug}/accomodation/room`}
                onClick={() => handleSubItemClick("frontdesk", "departures")}
                className={() => getSubLinkClass("frontdesk", "departures")}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <p className="flex items-center gap-2">
                    <ListChevronsDownUp className="h-4 w-4" />
                    <span>Departtures</span>
                  </p>
                  <p>(5)</p>
                </div>
              </NavLink>
              <NavLink
                to={`/${organization?.slug}/accomodation/room`}
                onClick={() => handleSubItemClick("frontdesk", "overdue")}
                className={() => getSubLinkClass("frontdesk", "overdue")}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <p className="flex items-center gap-2">
                    <ListChevronsDownUp className="h-4 w-4" />
                    <span>Overdue</span>
                  </p>
                  <p>(5)</p>
                </div>
              </NavLink>
            </div>
          )}
        </div>
        <div className=" w-full">
          <button
            type="button"
            onClick={() => toggleSubMenu("rooms")}
            className={`flex items-center gap-2 py-2 rounded-xl w-full ${openSubMenus.includes("rooms") ? linkActive : linkInactive}`}
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${openSubMenus.includes("rooms") ? "rotate-180 text-blue-500" : ""}`}
            />
            <span>Rooms</span>
          </button>

          {openSubMenus.includes("rooms") && (
            <div className="mt-1 flex w-full flex-col gap-1 border-b border-gray-100 bg-white p-1.5">
              <NavLink
                to={`/${organization?.slug}/accomodation/room`}
                onClick={() => handleSubItemClick("rooms", "roomList")}
                className={() => getSubLinkClass("rooms", "roomList")}
              >
                <p className="flex items-center gap-2">
                  <ListChevronsDownUp className="h-4 w-4" />
                  <span>Room List</span>
                </p>
              </NavLink>
            </div>
          )}
        </div>

        <div className="w-full">
          <button
            type="button"
            onClick={() => toggleSubMenu("reservation")}
            className={`flex items-center gap-2 py-2 rounded-xl w-full ${openSubMenus.includes("reservation") ? linkActive : linkInactive}`}
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${openSubMenus.includes("reservation") ? "rotate-180 text-blue-500" : ""}`}
            />
            <span>Reservation</span>
          </button>

          {openSubMenus.includes("reservation") && (
            <div className="mt-1 flex w-full flex-col gap-1 border-b border-gray-100 bg-white p-1.5">
              <NavLink
                to={`/${organization?.slug}/accomodation/reservation`}
                onClick={() =>
                  handleSubItemClick("reservation", "reservationList")
                }
                className={() =>
                  getSubLinkClass("reservation", "reservationList")
                }
              >
                <p className="flex items-center gap-2">
                  <ListChevronsDownUp className="h-4 w-4" />
                  <span>Reservation data</span>
                </p>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HotelNav;
