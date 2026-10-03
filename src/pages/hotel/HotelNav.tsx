import {
  BrushCleaning,
  Building,
  ChevronDown,
  Files,
  Hotel,
  ListChevronsDownUp,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useOrganization } from "../../utils/secureclient/context/OrganizationContext";
import { useState } from "react";
interface AccomodationNavbarProps {
  closeBar?: () => void;
}
type MenuKey = "frontdesk" | "rooms" | "reservation";

interface MenuItem {
  key: string;
  label: string;
  path: string;
  count?: number;
}

interface MenuSection {
  key: MenuKey;
  label: string;
  items: MenuItem[];
}
const linkBase = "flex justify-between pb-2 rounded-xl";
const linkActive = " text-blue-500 ";
const linkInactive = "hover:bg-blue-50";

const menuSection: MenuSection[] = [
  {
    key: "frontdesk",
    label: "Front-Desk",
    items: [
      {
        key: "guestRequest",
        label: "Guest Request",
        path: "guest-request",
        count: 5,
      },
      {
        key: "arrivals",
        label: "Arrivals",
        path: "arrivals",
        count: 5,
      },
      {
        key: "inHouse",
        label: "In-House",
        path: "in-house",
        count: 5,
      },
      {
        key: "departures",
        label: "Departures",
        path: "departures",
        count: 5,
      },
      {
        key: "overdue",
        label: "Overdue",
        path: "overdue",
        count: 5,
      },
    ],
  },
  {
    key: "rooms",
    label: "Rooms",
    items: [
      {
        key: "roomList",
        label: "Room List",
        path: "room",
      },
    ],
  },
  {
    key: "reservation",
    label: "Reservation",
    items: [
      {
        key: "reservationList",
        label: "Reservation data",
        path: "reservation",
      },
    ],
  },
];
const HotelNav = ({ closeBar }: AccomodationNavbarProps) => {
  const { organization } = useOrganization();
  const [isAccomodationOpen, setIsAccomodationOpen] = useState(false);
  // which menus are currently expanded.
  const [openSubMenus, setOpenSubMenus] = useState<
    ("rooms" | "reservation" | "frontdesk")[]
  >([]);
  //which submenu item was clicked.
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

  //open if closed closed if already expanded
  const toggleSubMenu = (menu: "rooms" | "reservation" | "frontdesk") => {
    setOpenSubMenus((current) =>
      current.includes(menu)
        ? current.filter((item) => item !== menu)
        : [...current, menu],
    );
  };
  //remembers the selected item:
  //close bar
  const handleSubItemClick = (
    menu: "rooms" | "reservation" | "frontdesk",
    key: string,
  ) => {
    setActiveSubItem({ menu, key });
    closeBar?.();
  };

  return (
    <nav className="flex h-full w-full max-h-screen flex-col bg-white p-3">
      <div className="relative flex w-full items-center justify-between gap-2">
        <div className="flex w-full items-center gap-1 px-1 py-2">
          <NavLink
            to={`/${organization?.slug}/accomodation`}
            onClick={closeBar}
            className="text-lg flex items-center gap-2 text-blue-500 font-bold"
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
            <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-xl border border-gray-100 bg-white p-4">
              <div className="w-full flex flex-col gap-5 ">
                {/* //manage */}
                <div className="border-b border-gray-300">
                  <p className="text-gray-700 text-sm ">Manage</p>
                  <div className="flex flex-col gap-1 mt-2">
                    <NavLink
                      to={`/${organization?.slug}/restaurant/products`}
                      onClick={closeBar}
                      className={getLinkClass}
                    >
                      Property
                    </NavLink>
                    <NavLink
                      to={`/${organization?.slug}/restaurant/price`}
                      onClick={closeBar}
                      // className="flex items-center gap-2"
                      className={getLinkClass}
                    >
                      Rate Plan
                    </NavLink>
                    <NavLink
                      to={`/${organization?.slug}/restaurant/offer`}
                      onClick={closeBar}
                      // className="flex items-center gap-2"
                      className={getLinkClass}
                    >
                      Offers and Discounts
                    </NavLink>
                  </div>
                </div>
                {/* // configuration*/}
                <div className="border-b border-gray-300">
                  <p className="text-gray-700 text-sm ">Configuration</p>
                  <div className="flex flex-col gap-1 mt-2">
                    <NavLink
                      to={`/${organization?.slug}/restaurant/products`}
                      onClick={closeBar}
                      className={getLinkClass}
                    >
                      Sales Settings
                      <Files className="w-4 h-4" />
                    </NavLink>
                    <NavLink
                      to={`/${organization?.slug}/restaurant/price`}
                      onClick={closeBar}
                      // className="flex items-center gap-2"
                      className={getLinkClass}
                    >
                      Staff and Access
                      <Files className="w-4 h-4" />
                    </NavLink>
                    <NavLink
                      to={`/${organization?.slug}/restaurant/offer`}
                      onClick={closeBar}
                      // className="flex items-center gap-2"
                      className={getLinkClass}
                    >
                      Device Setup
                      <Files className="w-4 h-4" />
                    </NavLink>
                  </div>
                </div>
                {/* //operations */}
                <div className="border-b border-gray-300">
                  <p className="text-gray-700 text-sm ">Operations</p>
                  <div className="flex flex-col gap-1 mt-2">
                    <NavLink
                      to={`/${organization?.slug}/restaurant/products`}
                      onClick={closeBar}
                      className={getLinkClass}
                    >
                      Room and HouseKeeping
                    </NavLink>
                    <NavLink
                      to={`/${organization?.slug}/restaurant/price`}
                      onClick={closeBar}
                      // className="flex items-center gap-2"
                      className={getLinkClass}
                    >
                      Night Audit
                    </NavLink>
                  </div>
                </div>
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
        {menuSection.map((menu) => {
          return (
            <div key={menu.key} className="w-full">
              <button
                type="button"
                onClick={() =>
                  toggleSubMenu(
                    menu.key as "rooms" | "reservation" | "frontdesk",
                  )
                }
                className={`flex w-full items-center gap-2 rounded-xl py-2 ${
                  openSubMenus.includes(
                    menu.key as "rooms" | "reservation" | "frontdesk",
                  )
                    ? linkActive
                    : linkInactive
                }`}
              >
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${
                    openSubMenus.includes(
                      menu.key as "rooms" | "reservation" | "frontdesk",
                    )
                      ? "rotate-180 text-blue-500"
                      : ""
                  }`}
                />
                {menu.label}
              </button>
              {openSubMenus.includes(
                menu.key as "rooms" | "reservation" | "frontdesk",
              ) && (
                <div className="mt-1 flex w-full flex-col gap-1 border-b border-gray-100 bg-white p-1.5">
                  {menu.items.map((item) => {
                    return (
                      <NavLink
                        key={item.key}
                        to={`/${organization?.slug}/accomodation/${item.path}`}
                        onClick={() =>
                          handleSubItemClick(
                            menu.key as "rooms" | "reservation" | "frontdesk",
                            item.key,
                          )
                        }
                        className={() =>
                          getSubLinkClass(
                            menu.key as "rooms" | "reservation" | "frontdesk",
                            item.key,
                          )
                        }
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <p className="flex items-center gap-2">
                            <ListChevronsDownUp className="h-4 w-4" />

                            <span>{item.label}</span>
                          </p>

                          {item.count !== undefined && <p>({item.count})</p>}
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default HotelNav;
