import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useOrganization } from "../../context/OrganizationContext";
import { ChevronDown, Gauge } from "lucide-react";

interface CateringNavProps {
  closeBar: () => void;
}
const CateringNavbar = ({ closeBar }: CateringNavProps) => {
  const { organization } = useOrganization();
  const [isCateringOpen, setIsCateringOpen] = useState(false);
  return (
    <nav className="flex h-full max-h-screen flex-col bg-white p-3 overscroll-contain">
      <div className="relative flex items-center justify-between px-1 py-2">
        <NavLink
          to={`/${organization?.slug}/catering`}
          onClick={closeBar}
          className={({ isActive }) =>
            ` font-bold flex items-center gap-2 text-sm ${isActive ? "text-blue-600" : "text-black"}`
          }
        >
          Catering
        </NavLink>
        <button onClick={() => setIsCateringOpen(!isCateringOpen)}>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isCateringOpen ? "rotate-180 text-blue-500" : ""}`}
          />
        </button>
        {isCateringOpen && (
          <div className="absolute left-0 top-full z-50 mt-1 flex h-40 w-full flex-col gap-1 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="">
              <p className="text-xs font-bold text-gray-600">Menu</p>
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
            <div className="">
              <p className="text-xs font-bold text-gray-600">Configuration</p>
              <NavLink
                to={`/${organization?.slug}/restaurant/products`}
                onClick={closeBar}
                className={({ isActive }) =>
                  ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
                }
              >
                Catring setting
              </NavLink>
              <NavLink
                to={`/${organization?.slug}/restaurant/price`}
                className={({ isActive }) =>
                  ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
                }
                onClick={closeBar}
              >
                Sales Setting
              </NavLink>
              <NavLink
                to={`/${organization?.slug}/restaurant/offer`}
                onClick={closeBar}
                className={({ isActive }) =>
                  ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
                }
              >
                Setting
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
          to={`/${organization?.slug}/restaurant/sales`}
          onClick={closeBar}
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
          to={`/${organization?.slug}/restaurant/offer`}
          onClick={closeBar}
          className={({ isActive }) =>
            ` flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          }
        >
          <Gauge className="w-4 h-4" />
          Offers
        </NavLink>
        <NavLink
          to={`/${organization?.slug}/restaurant/stock`}
          onClick={closeBar}
          className={({ isActive }) =>
            `flex items-center gap-2 text-sm p-2 hover:bg-blue-100 shadow-sm ${isActive ? "bg-blue-100" : "bg-white"}`
          }
        >
          <Gauge className="w-4 h-4" />
          Stock Clearence
        </NavLink>

        <NavLink
          to={`/${organization?.slug}/restaurant/kitchenOrders`}
          onClick={closeBar}
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

export default CateringNavbar;
