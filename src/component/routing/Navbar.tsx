
import { useState } from "react";
import { Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import type { Role } from "../../data/roles";
import { useOrganization } from "../../context/OrganizationContext";

/**
 * Defines which resources each user role is allowed to access.
 */
const rolePermissions: Record<Role, string[]> = {
  ADMIN: [
    "restaurant",
    "accomodation",
    "catering",
    "pms",
    "reservation-report",
    "reservation-calendar"
  ],

  RECEPTIONIST: ["accomodation", "reservation-report", "reservation-calendar"],

  WAITER: ["restaurant", "catering"],
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { user } = useAuth();
  const { organization } = useOrganization();

  const organizationSlug = (
    organization as { slug?: string } | null
  )?.slug;

  /**
   * Handles navigation based on authentication
   * and the user's role permissions.
   */
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    resource: string,
  ) => {
    // User is not logged in
    if (user === null) {
      e.preventDefault();
      navigate("/login");
      return;
    }

    // Get resources allowed for the current role
    const allowedResources = rolePermissions[user.role];

    // Prevent navigation if the role doesn't have permission
    if (!allowedResources.includes(resource)) {
      e.preventDefault();
      alert("Not accessible by this role");
      return;
    }

    // Close menu after successful navigation
    setIsOpen(false);
  };

  /**
   * Generates the organization-based route.
   */
  const getResourcePath = (resource: string) => {
    return `/${organizationSlug}/${resource}`;
  };

  return (
    <nav className="w-full bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Application Logo / Name */}
        <NavLink to="/" className="font-bold">
          LIQUID LOUNGE
        </NavLink>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="rounded-lg border border-gray-400 p-1 text-sm text-gray-500 focus:outline-none"
        />

        {/* Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="z-50"
            aria-label="Toggle menu"
          >
            <Menu />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-10 z-50 flex w-56 flex-col gap-2 bg-white p-4 text-left shadow-lg">
              <p className="text-xs text-gray-400">Menu</p>

              {/* Restaurant */}
              <NavLink
                to={getResourcePath("restaurant")}
                onClick={(e) => handleNavigation(e, "restaurant")}
                className={({ isActive }) =>
                  `${isActive ? "text-blue-800" : "text-black"
                  } rounded px-2 py-1 hover:bg-blue-50`
                }
              >
                Restaurant
              </NavLink>

              {/* Accommodation */}
              <NavLink
                to={getResourcePath("accomodation")}
                onClick={(e) => handleNavigation(e, "accomodation")}
                className={({ isActive }) =>
                  `${isActive ? "text-blue-800" : "text-black"
                  } rounded px-2 py-1 hover:bg-blue-50`
                }
              >
                Accommodations
              </NavLink>

              {/* Catering */}
              <NavLink
                to={getResourcePath("catering")}
                onClick={(e) => handleNavigation(e, "catering")}
                className={({ isActive }) =>
                  `${isActive ? "text-blue-800" : "text-black"
                  } rounded px-2 py-1 hover:bg-blue-50`
                }
              >
                Catering
              </NavLink>

              {/* PMS */}
              <NavLink
                to={getResourcePath("pms")}
                onClick={(e) => handleNavigation(e, "pms")}
                className={({ isActive }) =>
                  `${isActive ? "text-blue-800" : "text-black"
                  } rounded px-2 py-1 hover:bg-blue-50`
                }
              >
                PMS
              </NavLink>

              {/* Reservation Report */}
              <NavLink
                to={getResourcePath("reservation-report")}
                onClick={(e) =>
                  handleNavigation(e, "reservation-report")
                }
                className={({ isActive }) =>
                  `${isActive ? "text-blue-800" : "text-black"
                  } rounded px-2 py-1 hover:bg-blue-50`
                }
              >
                Reservation Report
              </NavLink>

              {/* Reservation Calendar */}
              <NavLink
                to={getResourcePath("reservation-calendar")}
                onClick={(e) =>
                  handleNavigation(e, "reservation-calendar")
                }
                className={({ isActive }) =>
                  `${isActive ? "text-blue-800" : "text-black"
                  } rounded px-2 py-1 hover:bg-blue-50`
                }
              >
                Reservation Calendar
              </NavLink>

              {/* Login */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/login");
                }}
                className="mt-2 rounded-2xl bg-blue-400 p-1 text-white hover:bg-blue-500"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
