//author:shrajja
import {
  ChevronDown,
  UtensilsCrossed,
  Play,
  ListCheck,
  Files,
  type LucideIcon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import { useAuth } from "../../utils/secureclient/context/useAuth";
import { useEffect, useState, useSyncExternalStore } from "react";
import { repo } from "../../repo/Repo";
import { getOrganizationPath } from "../../utils/secureclient/services/models/orgPath";

const restaurantMenu: {
  title: string;
  items: {
    label: string;
    path: string;
    icon?: LucideIcon;
    openSettings?: boolean;
  }[];
}[] = [
  {
    title: "Menu",
    items: [
      {
        label: "Products",
        path: "products",
      },
      {
        label: "Pricelist",
        path: "price",
      },
      {
        label: "Offers",
        path: "offer",
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        label: "Sales Setting",
        path: "products",
        icon: Files,
        openSettings: true,
      },
      {
        label: "Staffs and Access",
        path: "price",
        icon: Files,
      },
      {
        label: "Device Setup",
        path: "offer",
        icon: Files,
      },
    ],
  },
  {
    title: "Shell Profile",
    items: [
      {
        label: "Shell Status",
        path: "products",
        openSettings: true,
      },
    ],
  },
];
interface RestaurantNavbarProps {
  closeBar?: () => void;
  openSettings?: () => void;
}

const linkBase = "flex items-center gap-2 rounded-lg";
const linkActive = "bg-blue-100 text-blue-500";
const linkInactive = "hover:bg-blue-50";

const RestaurantNav = ({ closeBar, openSettings }: RestaurantNavbarProps) => {
  const location = useLocation();
  const { organization } = useAuth();
  //sessions aren't stored inside the component. stored in repo so React needs a way to subscribe to that external store.
  const posSessions = useSyncExternalStore(
    //Subscribe to the Repo's POS session changes.
    //.bind(repo)=makes sure this inside the method refers to your repo object.
    repo.subscribePOSSessions.bind(repo),
    // When you need the current value, get it from Repo
    repo.getPOSSessions.bind(repo),
  );

  //manually create Pos sessions
  //runs once when RestaurantNav mounts
  useEffect(() => {
    repo.setPOSSessions([
      {
        id: "1",
        restaurantId: "res-1",
        name: "Mon-24",
        children: [
          {
            id: "1-1",
            name: "TiyaPiya",
            path: "/guest",
          },
          {
            id: "1-2",
            name: "Ramsth",
            path: "/guest",
          },
        ],
      },
      {
        id: "2",
        restaurantId: "res-2",
        name: "Sun-24",
        children: [
          {
            id: "2-1",
            name: "Tiya",
            path: "/guest",
          },
          {
            id: "2-2",
            name: "Payments",
            path: "/guest",
          },
        ],
      },
    ]);
  }, []);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<number[]>([]);
  const [openSessions, setOpenSessions] = useState<string[]>([]);
  const restroNav = [
    {
      id: 1,
      name: "Overview",
      children: [
        {
          id: 1,
          label: "Sales Summary",
          path: "sales",
        },
        {
          id: 2,
          label: "Cash Summary",
          path: "cash",
        },
      ],
    },
    {
      id: 2,
      name: "POS Sessions",
      //generate from repository
      children: posSessions.map((session) => ({
        id: session.id,
        label: session.name,
        path: `pos-session/${session.id}`,
        children: session.children,
      })),
    },
  ];
  // const [isSettingOpen, setIsSettingOpen] = useState(false);
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? linkActive : linkInactive}`;
  //parnt
  const toggleMenu = (id: number) => {
    setOpenMenus((prev) =>
      prev.includes(id)
        ? prev.filter((menuId) => menuId !== id)
        : [...prev, id],
    );
  };
  //child
  const toggleSession = (id: string) => {
    setOpenSessions((prev) =>
      prev.includes(id)
        ? prev.filter((sessionId) => sessionId !== id)
        : [...prev, id],
    );
  };
  return (
    <nav className="flex h-full max-h-screen flex-col gap-1 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="relative flex items-center  w-full px-1 py-2">
          <NavLink
            to={getOrganizationPath("/restaurant", organization)}
            onClick={closeBar}
            className={({ isActive }) =>
              `font-bold flex items-center gap-2 ${isActive ? "text-blue-600" : ""}`
            }
          >
            <UtensilsCrossed className="text-lg" />
            <span>Restaurant</span>
          </NavLink>
          <button
            onClick={() => setIsRestaurantOpen(!isRestaurantOpen)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle restaurant menu"
          >
            <ChevronDown
              className={`w-5 h-5 text-gray-500  cursor-pointer transition-transform duration-200 ${
                isRestaurantOpen ? "rotate-180 text-blue-500" : ""
              }`}
            />
          </button>
          {isRestaurantOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 flex h-auto w-full flex-col gap-1 overflow-y-auto rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
              {restaurantMenu.map((section, sectionIndex) => (
                <div key={section.title} className="flex w-full flex-col gap-1">
                  <p className="pb-2 text-sm text-gray-900">{section.title}</p>

                  <div
                    className={`flex flex-col gap-3 ${
                      sectionIndex !== restaurantMenu.length - 1
                        ? "border-b border-gray-300 pb-2"
                        : ""
                    }`}
                  >
                    {section.items.map((item) => (
                      <NavLink
                        key={item.label}
                        to={getOrganizationPath(
                          `/restaurant/${item.path}`,
                          organization,
                        )}
                        // to={`/${organization?.slug}/restaurant/${item.path}`}
                        onClick={() => {
                          closeBar?.();
                        }}
                        className={`flex justify-between ${getLinkClass}`}
                      >
                        <span>{item.label}</span>
                        {item.icon && <item.icon className="h-4 w-4" />}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border border-gray-200 rounded-lg p-2 text-right">
          <Play className="text-blue-700 w-3 h-3" />
        </div>
      </div>

      {/* Main nav */}
      <div className="flex w-full flex-col gap-2 mt-3">
        {restroNav.map((item) => {
          const isOpen = openMenus.includes(item.id);
          return (
            <div key={item.id} className="w-full  pb-2">
              {/* Parent */}
              <button
                type="button"
                onClick={() => toggleMenu(item.id)}
                className="flex w-full gap-1 items-center rounded-lg text-left text-gray-800 hover:bg-blue-50  pb-2"
              >
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-blue-500" : ""
                  }`}
                />
                <span className="font-medium">{item.name}</span>
              </button>

              {/* Children */}
              {isOpen && (
                <div className="mt-1 flex flex-col gap-2 pl-5">
                  {item.children.map((child) => {
                    //Does this object have a children property?
                    //If children exists, give me its length. Otherwise don't crash.
                    const hasChildren =
                      "children" in child && child.children?.length;
                    const isSessionActive = location.pathname.includes(
                      `pos-session/${child.id}`,
                    );
                    const isSessionOpen = openSessions.includes(
                      String(child.id),
                    );

                    return (
                      <div key={child.id}>
                        {/* POS Session */}
                        {hasChildren ? (
                          <button
                            type="button"
                            onClick={() => toggleSession(String(child.id))}
                            className={`flex w-full items-center gap-2 rounded-lg border py-2 text-left transition-colors ${
                              isSessionActive || isSessionOpen
                                ? "border-blue-500 bg-blue-50 text-blue-600"
                                : "border-transparent hover:bg-blue-50"
                            }`}
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                isSessionOpen
                                  ? "rotate-180 text-blue-500"
                                  : "text-gray-500"
                              }`}
                            />

                            <span>{child.label}</span>
                          </button>
                        ) : (
                          <NavLink
                            // to={`/${organization?.slug}/restaurant/${child.path}`}
                            to={getOrganizationPath(
                              `/restaurant/${child.path}`,
                              organization,
                            )}
                            onClick={closeBar}
                            className={`flex gap-2 items-center ${getLinkClass}`}
                          >
                            <ListCheck className="h-4 w-4" />
                            <span>{child.label}</span>
                          </NavLink>
                        )}

                        {/* POS Session children */}
                        {hasChildren && isSessionOpen && (
                          <div className=" mt-1 flex flex-col gap-2 border-b border-gray-200 pb-2">
                            {child.children?.map((subChild) => (
                              <NavLink
                                key={subChild.id}
                                to={`/${organization?.slug}/restaurant/${subChild.path}`}
                                onClick={closeBar}
                                className={getLinkClass}
                              >
                                <ListCheck className="h-4 w-4" />

                                <span>{subChild.name}</span>
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
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

export default RestaurantNav;
