import { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/secureclient/context/AuthContext";
import { useOrganization } from "../utils/secureclient/context/OrganizationContext";
import NavigationSecurity from "../utils/secureclient/classes/NavigationSecurity";
import { type Resources } from "../utils/secureclient/models/permission";

//dynamic items
type NavItem = {
  label: string;
  path: string;
  resource: Resources;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};
const navGroups: NavGroup[] = [
  {
    label: "Manage",
    items: [
      {
        label: "Test Component",
        path: "/test-component",
        resource: "test-component",
      },
      {
        label: "Restaurant Session",
        path: "/restaurant",
        resource: "restaurant",
      },
      {
        label: "PMS",
        path: "/accomodation",
        resource: "accommodation",
      },
      {
        label: "Activity Logs",
        path: "/activity-log",
        resource: "activity-logs",
      },
      {
        label: "Reports",
        path: "/reservation-report",
        resource: "reports",
      },
    ],
  },
  {
    label: "Utilities",
    items: [
      {
        label: "Business Calendar",
        path: "/business-calender",
        resource: "businesscalender",
      },
    ],
  },
];

const Navbar = () => {
  const [isOpen, setISOpen] = useState(false);
  const { user, logout } = useAuth();
  const { organization } = useOrganization();
  const navigationSecurity = new NavigationSecurity();

  //filter to hide not accessible item
  const visibleGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        user ? navigationSecurity.canNavigate(user.role, item.resource) : false,
      ),
    }))
    .filter((group) => group.items.length > 0);

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
        <div onClick={() => setISOpen(!isOpen)} className="z-9999">
          <Menu />
          {isOpen && (
            <div className="absolute top-15 right-2 z-50 w-56 p-4 rounded-md bg-white text-left shadow-lg">
              {/* Manage + Utilities */}
              {visibleGroups.map((group) => (
                <div key={group.label} className="mb-4">
                  <p className="mb-2 text-xs font-semibold text-gray-700">
                    {group.label}
                  </p>

                  <div className="flex flex-col border-b border-gray-200">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={`/${organization?.slug}${item.path}`}
                        onClick={() => setISOpen(false)}
                        className={({ isActive }) =>
                          `rounded mb-2 font-normal hover:bg-blue-50 ${
                            isActive ? "text-blue-800" : "text-black"
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}

              {/* Account */}
              <div className="">
                <p className="mb-1 text-xs font-semibold text-gray-700">
                  Account
                </p>

                <div className="flex flex-col gap-2">
                  <NavLink
                    to={`/${organization?.slug}/profile`}
                    onClick={() => setISOpen(false)}
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
                    Logout{" "}
                    <span>
                      <LogOut className="w-4 h-5" />
                    </span>
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

//  <>
//                   <NavLink
//                     // to="/restaurant"
//                     to={`/${organization?.slug}/restaurant`}
//                     onClick={(e) => handleNavigation(e, RESOURCES.RESTAURANT)}
//
//                   >
//                     Restaurant
//                   </NavLink>

//                   <NavLink
//                     // to="/accomodation"
//                     to={`/${organization?.slug}/accomodation`}
//                     onClick={(e) =>
//                       handleNavigation(e, RESOURCES.ACCOMMODATION)
//                     }
//                     className={({ isActive }) =>
//                       `${
//                         isActive ? "text-blue-800" : "text-black"
//                       } hover:bg-blue-50 px-2 border border-gray-100`
//                     }
//                   >
//                     Accomodations
//                   </NavLink>
//                   <NavLink
//                     // to="/catering"
//                     to={`/${organization?.slug}/catering`}
//                     onClick={(e) => handleNavigation(e, RESOURCES.CATERING)}
//                     className={({ isActive }) =>
//                       `${
//                         isActive ? "text-blue-800" : "text-black"
//                       } hover:bg-blue-50 px-2 border border-gray-100`
//                     }
//                   >
//                     Catering
//                   </NavLink>
//                   <NavLink
//                     // to="/pms"
//                     to={`/${organization?.slug}/pms`}
//                     onClick={(e) => handleNavigation(e, RESOURCES.PMS)}
//                     className={({ isActive }) =>
//                       `${
//                         isActive ? "text-blue-800" : "text-black"
//                       } hover:bg-blue-50 px-2 border border-gray-100`
//                     }
//                   >
//                     PMS
//                   </NavLink>
//                   {/* */}
//                 </>
//                 <NavLink
//                   to={`/${organization?.slug}/reservation-report`}
//                   className={({ isActive }) =>
//                     `${
//                       isActive ? "text-blue-800" : "text-black"
//                     } hover:bg-blue-50 px-2 border border-gray-100`
//                   }
//                 >
//                   Reservation Report
//                 </NavLink>

// const navigate = useNavigate();
// Handle
// const handleNavigation = (
//   e: React.MouseEvent<HTMLAnchorElement>,
//   resource: Resources,
// ) => {
//   if (user === null) {
//     e.preventDefault();
//     navigate("/login");
//     return;
//   }

// const allowedResources = navigationSecurity.canNavigate(
//   user.role,
//   resource,
// );
// if (!allowedResources) {
//   e.preventDefault();
//   alert("cannot access by this role");
//   return;
// }
// };
