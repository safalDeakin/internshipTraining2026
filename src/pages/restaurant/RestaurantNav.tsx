import {
  ChevronDown,
  UtensilsCrossed,
  Play,
  ListCheck,
  Files,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useOrganization } from "../../utils/secureclient/context/OrganizationContext";
import { useEffect, useState, useSyncExternalStore } from "react";
import { repo } from "../../repo/Repo";

interface RestaurantNavbarProps {
  closeBar?: () => void;
  openSettings?: () => void;
}

const linkBase = "flex items-center gap-2 rounded-lg";
const linkActive = "bg-blue-100 text-blue-500";
const linkInactive = "hover:bg-blue-50";

const RestaurantNav = ({ closeBar, openSettings }: RestaurantNavbarProps) => {
  const { organization } = useOrganization();
  const posSessions = useSyncExternalStore(
    repo.subscribePOSSessions.bind(repo),
    repo.getPOSSessions.bind(repo),
  );
  useEffect(() => {
    repo.setPOSSessions([
      {
        id: "1",
        restaurantId: "res-1",
        name: "Mon-24",
      },
      {
        id: "2",
        restaurantId: "res-2",
        name: "Sun-24",
      },
    ]);
  }, []);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<number[]>([]);
  const restroNav = [
    {
      id: 1,
      name: "Overview",
      children: [
        {
          id: 1,
          label: "Sales Summary",
          path: "sales-summary",
        },
        {
          id: 2,
          label: "Cash Summary",
          path: "cash-summary",
        },
      ],
    },
    {
      id: 2,
      name: "POS Sessions",
      children: posSessions.map((session) => ({
        id: session.id,
        label: session.name,
        path: `pos-session/${session.id}`,
      })),
    },
  ];
  // const [isSettingOpen, setIsSettingOpen] = useState(false);
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? linkActive : linkInactive}`;
  const toggleMenu = (id: number) => {
    setOpenMenus((prev) =>
      prev.includes(id)
        ? prev.filter((menuId) => menuId !== id)
        : [...prev, id],
    );
  };
  return (
    <nav className="flex h-full max-h-screen flex-col gap-1 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="relative flex items-center  w-full px-1 py-2">
          <NavLink
            to={`/${organization?.slug}/restaurant`}
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
              <div className="flex flex-col gap-1 w-full">
                <p className="text-gray-800 text-sm pb-2">Menu</p>
                <div className="pb-2 border-b border-gray-300 flex flex-col gap-3">
                  <NavLink
                    to={`/${organization?.slug}/restaurant/products`}
                    onClick={closeBar}
                    className={getLinkClass}
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to={`/${organization?.slug}/restaurant/price`}
                    onClick={closeBar}
                    className={getLinkClass}
                  >
                    Pricelist
                  </NavLink>
                  <NavLink
                    to={`/${organization?.slug}/restaurant/offer`}
                    onClick={closeBar}
                    className={getLinkClass}
                  >
                    Offers
                  </NavLink>
                </div>
              </div>
              {/* // configuration*/}
              <div className="flex flex-col gap-1 w-full">
                <p className="text-gray-900 text-sm pb-2">Configuration</p>
                <div className="pb-2 border-b border-gray-300 flex flex-col gap-3">
                  <NavLink
                    to={`/${organization?.slug}/restaurant/products`}
                    onClick={() => {
                      openSettings?.();
                      closeBar?.();
                    }}
                    className={`flex justify-between ${getLinkClass}`}
                    // className={getLinkClass}
                  >
                    Sales Setting
                    <Files className="w-4 h-4 text-right" />
                  </NavLink>

                  <NavLink
                    to={`/${organization?.slug}/restaurant/price`}
                    onClick={closeBar}
                    className={`flex justify-between ${getLinkClass}`}
                  >
                    Staffs and Access
                    <Files className="w-4 h-4" />
                  </NavLink>
                  <NavLink
                    to={`/${organization?.slug}/restaurant/offer`}
                    onClick={closeBar}
                    className={`flex justify-between ${getLinkClass}`}
                  >
                    Device Setup
                    <Files className="w-4 h-4" />
                  </NavLink>
                </div>
              </div>

              {/* Shell Profile */}
              <div className="flex flex-col gap-1 w-full">
                <p className="text-gray-900 text-sm pb-2">Shell Profile</p>
                <div className="pb-2 flex flex-col gap-3">
                  <NavLink
                    to={`/${organization?.slug}/restaurant/products`}
                    onClick={() => {
                      openSettings?.();
                      closeBar?.();
                    }}
                    className={getLinkClass({ isActive: false })}
                  >
                    Shell Status
                  </NavLink>
                </div>
              </div>
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
            <div key={item.id} className="w-full pb-2 border-b border-gray-100">
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
                <div className="mt-1 flex flex-col gap-4 pl-5">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.id}
                      to={`/${organization?.slug}/restaurant/${child.path}`}
                      onClick={closeBar}
                      className={getLinkClass}
                    >
                      <ListCheck className="w-4 h-4" />
                      <span>{child.label}</span>
                    </NavLink>
                  ))}
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
