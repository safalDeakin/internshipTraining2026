// author: shrajja

import { ChevronDown, UtensilsCrossed, Play, ListCheck } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../../utils/secureclient/useAuth";
import { getOrganizationPath } from "../../utils/secureclient/services/models/orgPath";
import { usePOSUserSession } from "../../hooks/usePOSUserSession";

interface RestaurantNavbarProps {
  closeBar?: () => void;
  openSessionMode?: () => void;
}

const RestaurantNavbar = ({
  closeBar,
  openSessionMode,
}: RestaurantNavbarProps) => {
  const { organization } = useAuth();
  const { sessions } = usePOSUserSession();

  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [posSessionsOpen, setPosSessionsOpen] = useState(true);
  const [sessionInactive, setSessionInactive] = useState(false);

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

  // Show all active sessions for this organization.
  // Do not filter by session date.
  const activeSessions = sessions.filter(
    (session) =>
      session.endTime == null &&
      String(session.organizationId) === String(organization?.id),
  );

  // When there is no active session (ended or not started yet),
  // reset the gray flag so the next session starts green.
  useEffect(() => {
    if (activeSessions.length === 0) {
      setSessionInactive(false);
    }
  }, [activeSessions.length]);

  const handlePlayClick = () => {
    if (activeSessions.length > 0) {
      // Play clicked while a session is already active -> gray
      setSessionInactive(true);
    } else {
      // Starting a fresh session -> green
      setSessionInactive(false);
    }

    openSessionMode?.();
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
                  onClick={() => closeBar?.()}
                  className={getLinkClass}
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="border-t border-gray-200 pt-3">
                <p className="mb-2 text-sm text-gray-900">Configuration</p>
                {[
                  { label: "Sales Setting", path: "products" },
                  { label: "Staffs and Access", path: "price" },
                  { label: "Device Setup", path: "offer" },
                ].map((item) => (
                  <NavLink
                    key={item.label}
                    to={getOrganizationPath(
                      `/restaurant/${item.path}`,
                      organization,
                    )}
                    onClick={() => closeBar?.()}
                    className={getLinkClass}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg border border-gray-200 p-2"
          onClick={handlePlayClick}
          aria-label="Open session mode"
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
            {activeSessions.length > 0 ? (
              <>
                {/* Today's date */}
                <div className="flex items-center gap-2 rounded-lg border border-blue-500 bg-blue-50 py-2 px-2 text-blue-600">
                  <ChevronDown className="h-4 w-4" />
                  <span>{todayLabel}</span>
                </div>

                {/* Active users nested under today's date */}
                <div className="ml-3 flex flex-col gap-2 border-b border-gray-200 pb-2">
                  {activeSessions.map((session) => (
                    <NavLink
                      key={session.id}
                      to={getOrganizationPath(
                        `/restaurant/pos-session/${session.id}`,
                        organization,
                      )}
                      onClick={closeBar}
                      className={getLinkClass}
                    >
                      <ListCheck className="h-4 w-4" />
                      <span>{session.staffName}</span>

                      <span
                        className={`ml-auto h-2.5 w-2.5 rounded-full ${
                          session.isPaused ? "bg-gray-400" : "bg-green-500"
                        }`}
                        title={
                          session.isPaused ? "Session Paused" : "Session Active"
                        }
                      />
                    </NavLink>
                  ))}
                </div>
              </>
            ) : (
              <p className="px-2 py-2 text-sm text-gray-500">
                No active sessions today
              </p>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default RestaurantNavbar;
