import { useState } from "react";
import { Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Role } from "../../data/roles";
import { useOrganization } from "../../context/OrganizationContext";


/** * Defines which navigation resources are accessible * for each user role. */
const rolePermissions: Record<Role, string[]> = {
  ADMIN: [
    "restaurant",
    "accomodation",
    "catering",
    "pms",
    "reservation-report",
  ],
  RECEPTIONIST: [
    "accomodation",
    "reservation-report",
  ],

  WAITER: [
    "restaurant",
    "catering",
  ],
};

/* Navbar Component  */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth(); const { organization } = useOrganization();
  const navigate = useNavigate();
  /** * Toggles the navigation dropdown menu. */
  const change = () => { setIsOpen(!isOpen); };


  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, resource: string,) => {
    if (user === null) {
      e.preventDefault();
      navigate("/login");
      return;
    }

    const allowedResources = rolePermissions[user.role]; if (!allowedResources.includes(resource)) {
      e.preventDefault();
      alert("Not accessible by this role");
      return;
    }
  };

  const organizationSlug = organization && "slug" in organization && typeof organization.slug === "string"
    ? organization.slug
    : "";
  const basePath = organizationSlug ? `/${organizationSlug}` : ""; return (
    <div className="w-full flex flex-col gap-4 p-4 bg-white shadow-sm">
      <ul className="flex justify-between">
        {/* Application logo / home navigation */}
        <NavLink to="/" className="font-bold"> LIQUID LOUNGE </NavLink>

        {/* Global search input */}
        <input type="text" placeholder="search..." className="border border-gray-400 text-sm text-gray-500 p-1 rounded-lg focus:outline-none" />

        {/* Navigation menu */}
        <div onClick={change} className="z-9999" >
          <Menu />
          {isOpen && (<>
            {/* Dropdown menu */}
            <div className="absolute top-25 right-0 flex flex-col gap-2 w-40 p-4 shadow-sm bg-white text-left">
              <p className="text-xs text-gray-400"> Menu </p>

              {/* Restaurant */}
              <NavLink to={`${basePath}/restaurant`} onClick={(e) => handleNavigation(e, "restaurant")} className={({ isActive }) => `${isActive ? "text-blue-800" : "text-black"} hover:bg-blue-50 px-2 border border-gray-100`} >
                Restaurant
              </NavLink>

              {/* Accommodation */}
              <NavLink to={`${basePath}/accomodation`} onClick={(e) => handleNavigation(e, "accomodation")} className={({ isActive }) => `${isActive ? "text-blue-800" : "text-black"} hover:bg-blue-50 px-2 border border-gray-100`} >
                Accomodations
              </NavLink>

              {/* Catering */}
              <NavLink to={`${basePath}/catering`} onClick={(e) => handleNavigation(e, "catering")} className={({ isActive }) => `${isActive ? "text-blue-800" : "text-black"} hover:bg-blue-50 px-2 border border-gray-100`} >
                Catering
              </NavLink>

              {/* PMS */}
              <NavLink to={`${basePath}/pms`} onClick={(e) => handleNavigation(e, "pms")} className={({ isActive }) => `${isActive ? "text-blue-800" : "text-black"} hover:bg-blue-50 px-2 border border-gray-100`} >
                PMS
              </NavLink>

              {/* Reservation Report */}
              <NavLink to={`${basePath}/reservation-report`} onClick={(e) => handleNavigation(e, "reservation-report",)} className={({ isActive }) => `${isActive ? "text-blue-800" : "text-black"} hover:bg-blue-50 px-2 border border-gray-100`} >
                Reservation Report
              </NavLink>

              {/* Login */}
              <button onClick={() => navigate("/login")} className="bg-blue-400 rounded-2xl p-1" >
                Login
              </button>
            </div>
          </>)}
        </div>
      </ul>
    </div>);
}; export default Navbar;