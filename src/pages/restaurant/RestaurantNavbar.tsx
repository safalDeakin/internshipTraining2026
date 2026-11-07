// author: shrajja

import { ChevronDown, UtensilsCrossed, Play, ListCheck } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../lib/utils/secureclient/useAuth";
import { getOrganizationPath } from "../../lib/utils/secureclient/services/models/orgPath";
import { usePOSUserSession } from "./pages/posuserSession/context/usePOSUserSession";

const RestaurantNavbar = ({
  closeBar,
  openSessionMode,
  onOpenSetting,
}: RestaurantNavbarProps) => {
  const { organization } = useAuth();
  const { getLatestSession } = usePOSUserSession();

  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [posSessionsOpen, setPosSessionsOpen] = useState(true);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-lg px-2 py-2 ${
      isActive ? "bg-blue-100 text-blue-500" : "hover:bg-blue-50"
    }`;

  const todayLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kathmandu",
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(new Date());

  const latestSession =
    organization?.id != null ? getLatestSession(organization.id) : undefined;

  const sessionStatus = latestSession?.status;

  const statusConfig = {
    active: {
      label: "Active",
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    paused: {
      label: "Paused",
      color: "bg-orange-500",
      textColor: "text-orange-600",
    },
    ended: {
      label: "Ended",
      color: "bg-gray-400",
      textColor: "text-gray-500",
    },
  };

  const currentStatus = sessionStatus ? statusConfig[sessionStatus] : undefined;

  // RestaurantLayout handles whether to start, continue, or resume.
  const handlePlayClick = () => {
    openSessionMode?.();
    closeBar?.();
  };

  return (
    <nav className="flex h-full max-h-screen flex-col gap-1 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative flex w-full items-center px-1 py-2">
          <NavLink
            to={getOrganizationPath("/restaurant", organization)}
            onClick={closeBar}
            className={({ isActive }) =>
              `flex items-center gap-2 font-bold ${
                isActive ? "text-blue-600" : ""
              }`
            }
          >
            <UtensilsCrossed className="h-5 w-5" />
            <span>Restaurant</span>
          </NavLink>

          <button
            type="button"
            onClick={() => setIsRestaurantOpen((open) => !open)}
            className="rounded-md p-1 transition-colors hover:bg-gray-100"
            aria-label="Toggle restaurant menu"
          >
            <ChevronDown
              className={`h-5 w-5 text-gray-500 transition-transform ${
                isRestaurantOpen ? "rotate-180 text-blue-500" : ""
              }`}
            />
          </button>

          {isRestaurantOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 flex w-full flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
              <p className="text-sm text-gray-900">Menu</p>

              {[
                { label: "Products", path: "products" },
                { label: "Pricelist", path: "price" },
                { label: "Offers", path: "offer" },
              ].map((item) => (
                <NavLink
                  key={item.label}
                  to={getOrganizationPath(
                    `/restaurant/${item.path}`,
                    organization,
                  )}
                  onClick={() => {
                    setIsRestaurantOpen(false);
                    closeBar?.();
                  }}
                  className={getLinkClass}
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="border-t border-gray-200 pt-3">
                <p className="mb-2 text-sm text-gray-900">Configuration</p>

                {[
                  { label: "Sales Setting", id: "sales" },
                  { label: "Staffs and Access", id: "staffs" },
                  { label: "Device Setup", id: "devices" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setIsRestaurantOpen(false);
                      onOpenSetting?.(item.id);
                      closeBar?.();
                    }}
                    className={getLinkClass({ isActive: false })}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Start / Continue POS */}
        <button
          type="button"
          className="rounded-lg border border-gray-200 p-2 transition hover:bg-blue-50"
          onClick={handlePlayClick}
          aria-label="Open POS session"
          title={
            sessionStatus === "active"
              ? "Continue POS session"
              : sessionStatus === "paused"
                ? "Resume POS session"
                : "Start POS session"
          }
        >
          <Play className="h-3 w-3 text-blue-700" />
        </button>
      </div>

      {/* Overview */}
      <div className="mt-3">
        <button
          type="button"
          onClick={() => setOverviewOpen((open) => !open)}
          className="flex w-full items-center gap-1 rounded-lg pb-2 text-left text-gray-800 hover:bg-blue-50"
        >
          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform ${
              overviewOpen ? "rotate-180 text-blue-500" : ""
            }`}
          />
          <span className="font-medium">Overview</span>
        </button>

        {overviewOpen && (
          <div className="mt-1 flex flex-col gap-2 pl-5">
            {[
              { label: "Sales Summary", path: "sales" },
              { label: "Cash Summary", path: "cash" },
            ].map((item) => (
              <NavLink
                key={item.path}
                to={getOrganizationPath(
                  `/restaurant/${item.path}`,
                  organization,
                )}
                onClick={closeBar}
                className={getLinkClass}
              >
                <ListCheck className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* POS Sessions */}
      <div className="pb-2">
        <button
          type="button"
          onClick={() => setPosSessionsOpen((open) => !open)}
          className="flex w-full items-center gap-1 rounded-lg pb-2 text-left text-gray-800 hover:bg-blue-50"
        >
          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform ${
              posSessionsOpen ? "rotate-180 text-blue-500" : ""
            }`}
          />
          <span className="font-medium">POS Sessions</span>
        </button>

        {posSessionsOpen && (
          <div className="mt-1 flex flex-col gap-2 pl-5">
            <NavLink
              to={getOrganizationPath("/restaurant/pos-overview", organization)}
              onClick={closeBar}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg border px-2 py-2 ${
                  isActive
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:bg-blue-50"
                }`
              }
            >
              <ChevronDown className="h-4 w-4" />
              <span>{todayLabel}</span>
            </NavLink>

            {latestSession && (
              <div className="ml-3 flex flex-col gap-2 border-b border-gray-200 pb-2">
                <NavLink
                  to={getOrganizationPath(
                    "/restaurant/pos-overview",
                    organization,
                  )}
                  onClick={closeBar}
                  className={getLinkClass({ isActive: false })}
                >
                  <ListCheck className="h-4 w-4" />

                  <span className="min-w-0 flex-1 truncate text-left">
                    {latestSession.staffName}
                  </span>

                  {currentStatus && (
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${currentStatus.color}`}
                        title={`Session ${currentStatus.label}`}
                      />

                      {/* <span className={`text-xs ${currentStatus.textColor}`}>
                        {currentStatus.label}
                      </span> */}
                    </span>
                  )}
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

interface RestaurantNavbarProps {
  closeBar?: () => void;
  openSessionMode?: () => void;
  onOpenSetting?: (setting: string) => void;
}

export default RestaurantNavbar;
