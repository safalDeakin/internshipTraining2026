import { useState } from "react";
import { NavLink } from "react-router-dom";
import { activeMenu } from "./activate/activateConfig";

const PmsList = () => {
  const [isOperationOpen, setIsOperationOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openActiveId, setOpenActiveId] = useState(null);
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
    <div>
      <NavLink
        to="/pms"
        className={({ isActive }) =>
          `${isActive ? "text-blue-500" : "text-black"}`
        }
      >
        PMS
      </NavLink>
      <div className="pl-5 bg-white rounded-2xl flex flex-col gap-2">
        <button
          onClick={handleClick}
          // to="/pms/operations"
          // className={({ isActive }) =>
          //   `p-1 shadow-sm ${isActive ? "text-blue-500" : "text-black"}`
          // }
        >
          Operations
        </button>
        {isOperationOpen && (
          <>
            <NavLink
              to="/pms/operations/arrivals"
              className={({ isActive }) =>
                `hover:bg-blue-50 ${isActive ? "text-blue-500" : "text-black"}`
              }
            >
              Arrivals
            </NavLink>
            <NavLink
              to="/pms/operations/cash"
              className={({ isActive }) =>
                `hover:bg-blue-50 ${isActive ? "text-blue-500" : "text-black"}`
              }
            >
              Cash
            </NavLink>
          </>
        )}
        <button onClick={handleClickacti}>Activate</button>
        {isOpen &&
          activeMenu.map((active) => {
            return (
              <div key={active.id}>
                <button onClick={() => handleActiveClick(active.id)}>
                  {active.label}
                </button>
                {openActiveId === active.id && (
                  <div className="pl-5">
                    {active.children.map((child) => {
                      return (
                        <NavLink
                          to={`/pms/activate/${active.path}/${child.id}`}
                          className={({ isActive }) =>
                            `flex flex-col p-1 ${isActive ? "bg-blue-200" : "bg-white"}`
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
