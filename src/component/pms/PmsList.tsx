import { useState } from "react";
import { NavLink } from "react-router-dom";
import { activeMenu } from "./activate/activateConfig";
import { useOrganization } from "../../context/OrganizationContext";

const PmsList = () => {
  const [isOperationOpen, setIsOperationOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openActiveId, setOpenActiveId] = useState(null);
  const { organization } = useOrganization();
  const handleClick = () => {
    setIsOperationOpen(!isOperationOpen);
  };
  const handleClickacti = () => {
    setIsOpen(!isOpen);
  };
  const handleActiveClick = (id: any) => {
    setOpenActiveId((prev) => (prev === id ? null : id));
  };
  return (
    <div className="p-4">
      <NavLink
        to={`/${organization?.slug}/pms`}
        className={({ isActive }) =>
          `font-bold ${isActive ? "text-blue-500" : "text-black"}`
        }
      >
        PMS
      </NavLink>
      <div className="p-2 text-left bg-white rounded-lg flex flex-col gap-2 border border-gray-100 shadow-sm">
        <button
          onClick={handleClick}
          // to="/pms/operations"
          // className={({ isActive }) =>
          //   `p-1 shadow-sm ${isActive ? "text-blue-500" : "text-black"}`
          // }
          className="font-bold text-left p-1 shadow-sm "
        >
          Operations
        </button>
        {isOperationOpen && (
          <>
            <NavLink
              to={`/${organization?.slug}/pms/operations/arrivals`}
              className={({ isActive }) =>
                `hover:bg-blue-50 ${isActive ? "text-blue-500" : "text-black"}`
              }
            >
              Arrivals
            </NavLink>
            <NavLink
              to={`/${organization?.slug}/pms/operations/cash`}
              className={({ isActive }) =>
                `hover:bg-blue-50 ${isActive ? "text-blue-500" : "text-black"}`
              }
            >
              Cash
            </NavLink>
          </>
        )}
        <button
          onClick={handleClickacti}
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
    </div>
  );
};

export default PmsList;
