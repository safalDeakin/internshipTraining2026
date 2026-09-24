import { useState } from "react";
import { Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useOrganization } from "../context/OrganizationContext";
import NavigationSecurity from "../security/NavigationSecurity";
import { RESOURCES, type Resources } from "../security/permission";

const Navbar = () => {
  const navigationSecurity = new NavigationSecurity();
  const [isOpen, setISOpen] = useState(false);
  const { user } = useAuth();
  const { organization } = useOrganization();
  const chnage = () => {
    setISOpen(!isOpen);
  };
  const navigate = useNavigate();
  // Handle
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    resource: Resources,
  ) => {
    if (user === null) {
      e.preventDefault();
      navigate("/login");
      return;
    }

    const allowedResources = navigationSecurity.canNavigate(
      user.role,
      resource,
    );
    if (!allowedResources) {
      e.preventDefault();
      alert("cannot access by this role");
      return;
    }
  };

  return (
    <div className="w-full flex flex-col gap-4  bg-white shadow-sm p-3">
      <ul className="flex justify-between ">
        <NavLink to="/" className="font-bold ">
          {organization?.name || "Your Hotel"}
        </NavLink>
        <input
          type="text"
          placeholder="search..."
          className="hidden md:flex border border-gray-400 text-sm text-gray-500  rounded-full focus:outline-none p-1 "
        />
        <div onClick={chnage} className="z-9999">
          <Menu />
          {isOpen && (
            <>
              <div className="absolute top-25 right-0 flex flex-col gap-2 w-40 p-4 shadow-sm bg-white text-left">
                <p className="text-xs text-gray-400">Menu</p>

                <>
                  <NavLink
                    // to="/restaurant"
                    to={`/${organization?.slug}/restaurant`}
                    onClick={(e) => handleNavigation(e, RESOURCES.RESTAURANT)}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-blue-800" : "text-black"
                      } hover:bg-blue-50 px-2 border border-gray-100`
                    }
                  >
                    Restaurant
                  </NavLink>

                  <NavLink
                    // to="/accomodation"
                    to={`/${organization?.slug}/accomodation`}
                    onClick={(e) =>
                      handleNavigation(e, RESOURCES.ACCOMMODATION)
                    }
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-blue-800" : "text-black"
                      } hover:bg-blue-50 px-2 border border-gray-100`
                    }
                  >
                    Accomodations
                  </NavLink>
                  <NavLink
                    // to="/catering"
                    to={`/${organization?.slug}/catering`}
                    onClick={(e) => handleNavigation(e, RESOURCES.CATERING)}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-blue-800" : "text-black"
                      } hover:bg-blue-50 px-2 border border-gray-100`
                    }
                  >
                    Catering
                  </NavLink>
                  <NavLink
                    // to="/pms"
                    to={`/${organization?.slug}/pms`}
                    onClick={(e) => handleNavigation(e, RESOURCES.PMS)}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-blue-800" : "text-black"
                      } hover:bg-blue-50 px-2 border border-gray-100`
                    }
                  >
                    PMS
                  </NavLink>
                  {/* <NavLink
                    // to="/reservation-report"
                    to={`/${organization?.slug}/reservation-report`}
                    onClick={(e) => handleNavigation(e, RESOURCES.)}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-blue-800" : "text-black"
                      } hover:bg-blue-50 px-2 border border-gray-100`
                    }
                  >
                    Reservation Report
                  </NavLink> */}
                </>

                {/* {user?.role === "RECEPTIONIST" && (
                  <>
                    <NavLink
                      to="/accomodation"
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-blue-800" : "text-black"
                        } hover:bg-blue-50 px-2 border border-gray-100`
                      }
                    >
                      Accomodations
                    </NavLink>
                    <NavLink
                      to="/reservation-report"
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-blue-800" : "text-black"
                        } hover:bg-blue-50 px-2 border border-gray-100`
                      }
                    >
                      Reservation Report
                    </NavLink>
                  </>
                )}

                {user?.role === "WAITER" && (
                  <>
                    <NavLink
                      to="/catering"
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-blue-800" : "text-black"
                        } hover:bg-blue-50 px-2 border border-gray-100`
                      }
                    >
                      Catering
                    </NavLink>
                    <NavLink
                      to="/restaurant"
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-blue-800" : "text-black"
                        } hover:bg-blue-50 px-2 border border-gray-100`
                      }
                    >
                      Restaurant
                    </NavLink>
                  </>
                )} */}

                <NavLink
                  to="/reservation-report"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-blue-800" : "text-black"
                    } hover:bg-blue-50 px-2 border border-gray-100`
                  }
                >
                  Reservation Report
                </NavLink>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-400 rounded-2xl p-1"
                >
                  Logout
                </button>
              </div>
              {/* <Button onClick={() => navigate("/login")}>Login</Button> */}
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
