import {
  ChevronDown,
  Gauge,
  Tag,
  ClipboardList,
  Warehouse,
  ChefHat,
  Settings,
  X,
  UtensilsCrossed,
  Play,
  SquareChevronUp,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useOrganization } from "../../context/OrganizationContext";
import { useState } from "react";

interface RestaurantNavbarProps {
  closeBar: () => void;
  openSettings: () => void;
}

const linkBase = "flex items-center gap-2 px-4 py-2 rounded-xl text-sm";
const linkActive = "bg-blue-100 text-blue-700";
const linkInactive = "text-blue-950 hover:bg-blue-50";

const RestaurantNav = ({ closeBar, openSettings }: RestaurantNavbarProps) => {
  const { organization } = useOrganization();
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
  // const [isSettingOpen, setIsSettingOpen] = useState(false);
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? linkActive : linkInactive}`;

  return (
    <nav className="flex h-full max-h-screen flex-col gap-1 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="relative flex items-center px-1 py-2">
          <NavLink
            to={`/${organization?.slug}/restaurant`}
            onClick={closeBar}
            className={({ isActive }) =>
              `text-lg flex items-center gap-2 ${
                isActive ? "text-blue-800" : "text-gray-900"
              }`
            }
          >
            <UtensilsCrossed className="text-lg" />
            <span>Restaurant</span>
          </NavLink>
          <button
            onClick={() => setIsRestaurantOpen(!isRestaurantOpen)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle restaurant menu"
          >
            <ChevronDown
              className={`w-5 h-5 text-gray-500  cursor-pointer transition-transform duration-200 ${
                isRestaurantOpen ? "rotate-180 text-blue-500" : ""
              }`}
            />
          </button>
          {isRestaurantOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 flex h-auto w-full flex-col gap-1 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg">
              <div className="flex flex-col gap-1 w-full">
                <p className="text-gray-600 text-medium flex items-center gap-2 border-b border-gray-200">
                  <SquareChevronUp className="w-4 h-4 text-gray-500" />
                  <span>Menu</span>
                </p>
                <NavLink
                  to={`/${organization?.slug}/restaurant/products`}
                  onClick={closeBar}
                  className={getLinkClass}
                >
                  <Tag className="w-4 h-4" />
                  Products
                </NavLink>
                <NavLink
                  to={`/${organization?.slug}/restaurant/price`}
                  onClick={closeBar}
                  className={getLinkClass}
                >
                  <ClipboardList className="w-4 h-4" />
                  Pricelist
                </NavLink>
                <NavLink
                  to={`/${organization?.slug}/restaurant/offer`}
                  onClick={closeBar}
                  className={getLinkClass}
                >
                  <Gauge className="w-4 h-4" />
                  Offers
                </NavLink>
                <NavLink
                  to={`/${organization?.slug}/restaurant/setup`}
                  onClick={closeBar}
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
                <button
                  // to={`/${organization?.slug}/restaurant/products`}
                  onClick={() => {
                    openSettings();
                    closeBar();
                  }}
                  className={getLinkClass({ isActive: false })}
                  // className={getLinkClass}
                >
                  <Tag className="w-4 h-4" />
                  Setting
                </button>

                <NavLink
                  to={`/${organization?.slug}/restaurant/price`}
                  onClick={closeBar}
                  className={getLinkClass}
                >
                  <ClipboardList className="w-4 h-4" />
                  User settings
                </NavLink>
                <NavLink
                  to={`/${organization?.slug}/restaurant/offer`}
                  onClick={closeBar}
                  className={getLinkClass}
                >
                  <Gauge className="w-4 h-4" />
                  Sales Setting
                </NavLink>
              </div>
            </div>
          )}
        </div>
        <div className="border border-gray-200 rounded-lg p-2 text-right">
          <Play className="text-blue-700 w-3 h-3" />
        </div>
      </div>

      {/* Dropdown section */}

      <div className="h-px bg-gray-100 mx-1 mb-2" />

      {/* Main nav */}
      <div className="flex flex-col gap-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <NavLink
          to={`/${organization?.slug}/restaurant/sales`}
          onClick={closeBar}
          className={getLinkClass}
        >
          <Gauge className="w-4 h-4" />
          Sales Offer
        </NavLink>
        <NavLink
          to={`/${organization?.slug}/restaurant/offer`}
          onClick={closeBar}
          className={getLinkClass}
        >
          <Tag className="w-4 h-4" />
          Offers
        </NavLink>
        <NavLink
          to={`/${organization?.slug}/restaurant/stock`}
          onClick={closeBar}
          className={getLinkClass}
        >
          <Warehouse className="w-4 h-4" />
          Stock Clearance
        </NavLink>
        <NavLink
          to={`/${organization?.slug}/restaurant/kitchenOrders`}
          onClick={closeBar}
          className={getLinkClass}
        >
          <ChefHat className="w-4 h-4" />
          Kitchen Orders
        </NavLink>
      </div>
    </nav>
  );
};

export default RestaurantNav;
