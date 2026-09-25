import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useOrganization } from "../../context/OrganizationContext";
import {
  ChefHat,
  ChevronDown,
  ClipboardList,
  CookingPot,
  Gauge,
  Settings,
  SquareChevronUp,
  Tag,
  Warehouse,
} from "lucide-react";

interface CateringNavProps {
  closeBar: () => void;
}
const linkBase = "flex items-center gap-2 px-4 py-2 rounded-xl text-sm";
const linkActive = "bg-blue-100 text-blue-700";
const linkInactive = "text-blue-950 hover:bg-blue-50";
const CateringNavbar = ({ closeBar }: CateringNavProps) => {
  const { organization } = useOrganization();
  const [isCateringOpen, setIsCateringOpen] = useState(false);
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? linkActive : linkInactive}`;

  return (
    <nav className="flex h-full max-h-screen flex-col bg-white p-3 overscroll-contain">
      <div className="relative flex items-center justify-between px-1 py-2">
        <NavLink
          to={`/${organization?.slug}/catering`}
          onClick={closeBar}
          className={({ isActive }) =>
            `text-lg flex items-center gap-2 ${isActive ? "text-blue-800" : "text-black"}`
          }
        >
          <CookingPot />
          <span>Catering</span>
        </NavLink>
        <button onClick={() => setIsCateringOpen(!isCateringOpen)}>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isCateringOpen ? "rotate-180 text-blue-500" : ""}`}
          />
        </button>
        {isCateringOpen && (
          // <div className="absolute left-0 top-full z-50 mt-1 flex h-40 w-full flex-col gap-1 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          //   <div className="">
          //     <p className="text-xs font-bold text-gray-600">Menu</p>
          //     <NavLink
          //       to={`/${organization?.slug}/restaurant/products`}
          //       onClick={closeBar}
          //       className={({ isActive }) =>
          //         ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          //       }
          //     >
          //       Products{" "}
          //     </NavLink>
          //     <NavLink
          //       to={`/${organization?.slug}/restaurant/price`}
          //       className={({ isActive }) =>
          //         ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          //       }
          //       onClick={closeBar}
          //     >
          //       Pricelist
          //     </NavLink>
          //     <NavLink
          //       to={`/${organization?.slug}/restaurant/offer`}
          //       onClick={closeBar}
          //       className={({ isActive }) =>
          //         ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          //       }
          //     >
          //       Offers
          //     </NavLink>
          //     <NavLink
          //       to={`/${organization?.slug}/restaurant/setup`}
          //       onClick={closeBar}
          //       className={({ isActive }) =>
          //         ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          //       }
          //     >
          //       DeviceSetup
          //     </NavLink>
          //   </div>
          //   <div className="">
          //     <p className="text-xs font-bold text-gray-600">Configuration</p>
          //     <NavLink
          //       to={`/${organization?.slug}/restaurant/products`}
          //       onClick={closeBar}
          //       className={({ isActive }) =>
          //         ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          //       }
          //     >
          //       Catring setting
          //     </NavLink>
          //     <NavLink
          //       to={`/${organization?.slug}/restaurant/price`}
          //       className={({ isActive }) =>
          //         ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          //       }
          //       onClick={closeBar}
          //     >
          //       Sales Setting
          //     </NavLink>
          //     <NavLink
          //       to={`/${organization?.slug}/restaurant/offer`}
          //       onClick={closeBar}
          //       className={({ isActive }) =>
          //         ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          //       }
          //     >
          //       Setting
          //     </NavLink>
          //     <NavLink
          //       to={`/${organization?.slug}/restaurant/setup`}
          //       onClick={closeBar}
          //       className={({ isActive }) =>
          //         ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          //       }
          //     >
          //       User Setting
          //     </NavLink>
          //   </div>
          // </div>
          <div className="absolute left-0 top-full z-50 mt-1 flex h-40 w-full flex-col gap-1 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
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
              <NavLink
                to={`/${organization?.slug}/restaurant/products`}
                onClick={() => {
                  // openSettings();
                  closeBar();
                }}
                // className={getLinkClass({ isActive: false })}
                className={getLinkClass}
              >
                <Tag className="w-4 h-4" />
                Setting
              </NavLink>

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

export default CateringNavbar;
