// author: shrjja

import { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import NavigationSecurity from "../services/utils/NavigationSecurity";
import type { AppRoute } from "../services/routes/appRoutes";

interface NavbarProps {
  routes: AppRoute[];
}

const Navbar = ({ routes }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, getOrganizationFromSlug } = useAuth();
  const { organizationSlug } = useParams();
  const organization = getOrganizationFromSlug(organizationSlug);
  //permission check
  const navigationSecurity = new NavigationSecurity();

  //routes the current user is allowed to see.
  const visibleRoutes = routes.filter(
    (route) =>
      route.nav &&
      user &&
      navigationSecurity.canNavigate(user.role, route.nav.resource),
  );

  //put routes into groups
  const groupedRoutes = visibleRoutes.reduce<Record<string, AppRoute[]>>(
    (groups, route) => {
      const group = route.nav!.group;
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(route);
      return groups;
    },
    {},
  );
  //this groupedroutes return in object

  return (
    <div className="w-full flex flex-col gap-4 bg-white shadow-sm p-3">
      <ul className="flex justify-between items-center">
        {/* Organization / Dashboard */}
        <NavLink to="." className="font-bold">
          {organization?.name || " "}
        </NavLink>

        {/* Search */}
        <input
          type="text"
          placeholder="search..."
          className="hidden md:flex border border-gray-400 text-sm text-gray-500 rounded-full focus:outline-none p-1"
        />

        {/* Menu */}
        <div onClick={() => setIsOpen(!isOpen)} className="relative z-9999">
          <Menu />

          {isOpen && (
            <div className="absolute top-8 right-2 z-50 w-56 p-4 rounded-md bg-white text-left shadow-lg">
              {/* Navigation Groups */}
              {/* make array to map it  */}
              {Object.entries(groupedRoutes).map(([groupName, groupRoutes]) => (
                <div key={groupName} className="mb-4">
                  <p className="mb-2 text-xs font-semibold text-gray-700">
                    {groupName}
                  </p>

                  <div className="flex flex-col border-b border-gray-200">
                    {groupRoutes.map((route) => (
                      <NavLink
                        key={route.path}
                        to={route.path!}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `rounded mb-2 font-normal hover:bg-blue-50 ${
                            isActive ? "text-blue-800" : "text-black"
                          }`
                        }
                      >
                        {route.nav!.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}

              {/* Account */}
              <div>
                <p className="mb-1 text-xs font-semibold text-gray-700">
                  Account
                </p>

                <div className="flex flex-col gap-2">
                  <NavLink
                    to="profile"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `rounded hover:bg-blue-50 ${
                        isActive ? "text-blue-800" : "text-black"
                      }`
                    }
                  >
                    User Profile
                  </NavLink>

                  <button
                    onClick={logout}
                    className="rounded text-left text-black hover:bg-red-50 flex items-center gap-2"
                  >
                    Logout
                    <LogOut className="w-4 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
