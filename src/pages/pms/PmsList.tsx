import { useState } from "react";
import { NavLink } from "react-router-dom";
import { activeMenu } from "./activate/activateConfig";
import { useOrganization } from "../../context/OrganizationContext";
import { ChevronDown, MonitorCheck } from "lucide-react";

interface PmsProps {
  closeBar: () => void;
}
const PmsList = ({ closeBar }: PmsProps) => {
  const [isPmsOpen, setIsPmsOpen] = useState(false);
  const [isOperationOpen, setIsOperationOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openActiveId, setOpenActiveId] = useState(null);
  const { organization } = useOrganization();
  const handleClick = () => {
    setIsOperationOpen(!isOperationOpen);
  };
  const handleActiveClick = (id: any) => {
    setOpenActiveId((prev) => (prev === id ? null : id));
  };
  return (
    <nav className="w-50 md:w-auto flex h-full max-h-screen flex-col bg-white p-3 overscroll-contain">
      <div className="relative flex items-center justify-between px-1 py-2">
        <NavLink
          to={`/${organization?.slug}/pms`}
          onClick={closeBar}
          className={({ isActive }) =>
            `${isActive ? "text-blue-500" : "text-black"}`
          }
        >
          <MonitorCheck />
          <span>PMS</span>
        </NavLink>
        <button
          onClick={() => setIsPmsOpen(!isPmsOpen)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle restaurant menu"
        >
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isPmsOpen ? "rotate-180 text-blue-500" : ""
            }`}
          />
        </button>
        {isPmsOpen && (
          <div className="absolute left-0 top-full z-50 mt-1 flex h-full w-full flex-col gap-1 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <NavLink
              to={`/${organization?.slug}/restaurant/products`}
              onClick={closeBar}
              className={({ isActive }) =>
                `${isActive ? "text-blue-500" : "text-black"}`
              }
            >
              Products
            </NavLink>
            <NavLink
              to={`/${organization?.slug}/restaurant/price`}
              onClick={closeBar}
            >
              Pricelist
            </NavLink>
            <NavLink
              to={`/${organization?.slug}/restaurant/offer`}
              onClick={closeBar}
              className={({ isActive }) =>
                ` ${isActive ? "text-blue-500" : "text-black"}`
              }
            >
              Offers
            </NavLink>
            <NavLink
              to={`/${organization?.slug}/restaurant/setup`}
              onClick={closeBar}
              className={({ isActive }) =>
                ` ${isActive ? "text-blue-500" : "text-black"}`
              }
            >
              Device Setup
            </NavLink>
          </div>
        )}
      </div>

      <div className="flex flex-col mx-1 mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <button
          onClick={handleClick}
          className="font-bold text-left p-1 shadow-sm "
        >
          Operations
        </button>
        {isOperationOpen && (
          <>
            <NavLink
              to={`/${organization?.slug}/pms/operations/arrivals`}
              onClick={closeBar}
              className={({ isActive }) =>
                `hover:bg-blue-50 p-1 ${isActive ? "text-blue-500" : "text-black"}`
              }
            >
              Arrivals
            </NavLink>
            <NavLink
              to={`/${organization?.slug}/pms/operations/cash`}
              onClick={closeBar}
              className={({ isActive }) =>
                `hover:bg-blue-50 p-1 ${isActive ? "text-blue-500" : "text-black"}`
              }
            >
              Cash
            </NavLink>
          </>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-bold text-left p-1 shadow-sm "
        >
          Activate
        </button>
        {isOpen &&
          activeMenu.map((active) => {
            return (
              <div key={active.id}>
                <button
                  onClick={() => handleActiveClick(active.id)}
                  // className="text-blue-500"
                >
                  {active.label}
                </button>
                {openActiveId === active.id && (
                  <div className="pl-5">
                    {active.children.map((child) => {
                      return (
                        <NavLink
                          key={child.id}
                          to={`/${organization?.slug}/pms/activate/${active.path}/${child.id}`}
                          onClick={closeBar}
                          className={({ isActive }) =>
                            `flex flex-col p-1 hover:bg-blue-100 ${isActive ? "bg-blue-200" : "bg-white"}`
                          }
                        >
                          {child.name}
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

export default PmsList;
