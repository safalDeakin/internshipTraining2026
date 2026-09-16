import { useState } from "react";
import { Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import type { Resources } from "../../constants/permission";
import type { Role } from "../data/roles";
import { useOrganization } from "../context/OrganizationContext";

const rolePermissions: Record<Role, string[]> = {
  ADMIN: [
    "restaurant",
    "accomodation",
    "catering",
    "pms",
    "reservation-report",
  ],

  RECEPTIONIST: ["accomodation", "reservation-report"],

  WAITER: ["restaurant", "catering"],
};
const Navbar = () => {
  const [isOpen, setISOpen] = useState(false);
  const { user } = useAuth();
  const { organization } = useOrganization();
  const chnage = () => {
    setISOpen(!isOpen);
  };
  const navigate = useNavigate();
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    resource: string,
  ) => {
    if (user === null) {
      e.preventDefault();
      navigate("/login");
      return;
    }

    const allowedResources = rolePermissions[user.role];
    if (!allowedResources.includes(resource)) {
      e.preventDefault();
      alert("Not accessibl by this role");
      return;
    }
  };
  return (
    <div className="w-full flex flex-col gap-4  bg-white shadow-sm p-5">
      <ul className="flex justify-between ">
        <NavLink to="/" className="font-bold ">
          {organization?.name || "Your Hotel"}
        </NavLink>
        <input
          type="text"
          placeholder="search..."
          className="border border-gray-400 text-sm text-gray-500 p-1 rounded-lg focus:outline-none "
        />
        <div onClick={chnage}>
          <Menu />
          {isOpen && (
            <>
              <div className="absolute top-25 right-0 flex flex-col gap-2 w-40 p-4 shadow-sm bg-white text-left">
                <p className="text-xs text-gray-400">Menu</p>

                <>
                  <NavLink
                    // to="/restaurant"
                    to={`/${organization?.slug}/restaurant`}
                    onClick={(e) => handleNavigation(e, "restaurant")}
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
                    onClick={(e) => handleNavigation(e, "accomodation")}
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
                    onClick={(e) => handleNavigation(e, "catering")}
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
                    onClick={(e) => handleNavigation(e, "pms")}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-blue-800" : "text-black"
                      } hover:bg-blue-50 px-2 border border-gray-100`
                    }
                  >
                    PMS
                  </NavLink>
                  <NavLink
                    // to="/reservation-report"
                    to={`/${organization?.slug}/reservation-report`}
                    onClick={(e) => handleNavigation(e, "reservation-report")}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-blue-800" : "text-black"
                      } hover:bg-blue-50 px-2 border border-gray-100`
                    }
                  >
                    Reservation Report
                  </NavLink>
                </>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-400 rounded-2xl p-1"
                >
                  Login
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
