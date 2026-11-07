import { ChevronDown, UtensilsCrossed, Play, ListCheck } from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import { useAuth } from "../../lib/utils/secureclient/useAuth";
import { getOrganizationPath } from "../../lib/utils/secureclient/services/models/orgPath";
import { usePOSUserSession } from "./pages/posuserSession/context/usePOSUserSession";

import type { POSSession } from "./pages/posuserSession/types/posSessionTypes";

interface RestaurantNavbarProps {
  closeBar?: () => void;
  openSessionMode?: () => void;
  onOpenSetting?: (setting: string) => void;
}

const RestaurantNavbar = ({
  closeBar,
  openSessionMode,
  onOpenSetting,
}: RestaurantNavbarProps) => {
  const { organization } = useAuth();
  const navigate = useNavigate();

  const {
    sessions,
    getLatestSession,
    selectedDate,
    selectedStaffName,
    setSelectedDate,
    setSelectedStaffName,
  } = usePOSUserSession();

  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [posSessionsOpen, setPosSessionsOpen] = useState(true);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-lg px-2 py-2 ${
      isActive ? "bg-blue-100 text-blue-500" : "hover:bg-blue-50"
    }`;

  // Format date for the sidebar.
  const formatDate = (date: string) => {
    const dateKey = date.slice(0, 10);
    const parsedDate = new Date(`${dateKey}T12:00:00+05:45`);

    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kathmandu",
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(parsedDate);
  };

  // Get only the latest session of each staff member
  const organizationSessions = useMemo(() => {
    if (organization?.id == null) return [];

    const filteredSessions = sessions.filter(
      (session) => String(session.organizationId) === String(organization.id),
    );

    const latestSessionsByStaff = new Map<string, POSSession>();

    filteredSessions.forEach((session) => {
      const staffKey = String(session.staffId);

      const existingSession = latestSessionsByStaff.get(staffKey);

      if (
        !existingSession ||
        new Date(session.startTime).getTime() >
          new Date(existingSession.startTime).getTime()
      ) {
        latestSessionsByStaff.set(staffKey, session);
      }
    });

    return Array.from(latestSessionsByStaff.values());
  }, [sessions, organization?.id]);
  // Group sessions by date.
  const groupedSessions = useMemo(() => {
    const groups = organizationSessions.reduce<Record<string, POSSession[]>>(
      (result, session) => {
        const dateKey = session.date.slice(0, 10);

        if (!result[dateKey]) {
          result[dateKey] = [];
        }

        result[dateKey].push(session);

        return result;
      },
      {},
    );

    // Sort sessions inside each date by latest start time.
    Object.values(groups).forEach((dateSessions) => {
      dateSessions.sort(
        (a, b) =>
          new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
      );
    });

    // Sort dates from newest to oldest.
    return Object.entries(groups).sort(([dateA], [dateB]) =>
      dateB.localeCompare(dateA),
    );
  }, [organizationSessions]);

  const latestSession =
    organization?.id != null ? getLatestSession(organization.id) : undefined;

  const sessionStatus = latestSession?.status;

  const statusConfig = {
    active: {
      label: "Active",
      color: "bg-green-500",
    },
    paused: {
      label: "Paused",
      color: "bg-orange-500",
    },
    ended: {
      label: "Ended",
      color: "bg-gray-400",
    },
  };

  // Open or continue POS session.
  const handlePlayClick = () => {
    openSessionMode?.();
    closeBar?.();
  };

  // Select a date and open POS Overview.
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedStaffName(null);

    navigate(getOrganizationPath("/restaurant/pos-overview", organization));

    closeBar?.();
  };

  // Select a staff session and open POS Overview.
  const handleStaffSelect = (session: POSSession) => {
    setSelectedStaffName(session.staffName);
    setSelectedDate(null);

    navigate(getOrganizationPath("/restaurant/pos-overview", organization));

    closeBar?.();
  };

  return (
    <nav className="flex h-full max-h-screen flex-col gap-1 overflow-y-auto p-4">
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
          <div className="mt-1 flex flex-col gap-3 pl-5">
            {groupedSessions.length === 0 ? (
              <p className="px-2 py-2 text-xs text-gray-400">
                No POS sessions found.
              </p>
            ) : (
              groupedSessions.map(([date, dateSessions]) => (
                <div key={date} className="flex flex-col gap-1">
                  {/* Date selection */}
                  <button
                    type="button"
                    onClick={() => handleDateSelect(date)}
                    className={`flex items-center gap-2 rounded-lg border px-2 py-2 text-left text-sm ${
                      selectedDate === date && !selectedStaffName
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:bg-blue-50"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />

                    <span className="font-medium">{formatDate(date)}</span>

                    <span className="ml-auto text-xs text-gray-400">
                      {dateSessions.length}
                    </span>
                  </button>

                  {/* Staff sessions for this date */}
                  <div className="ml-3 flex flex-col gap-1 border-l border-gray-200 pl-3">
                    {dateSessions.map((session) => {
                      const status = statusConfig[session.status];

                      return (
                        <button
                          key={session.id}
                          type="button"
                          onClick={() => handleStaffSelect(session)}
                          className={`flex items-center gap-2 rounded-lg px-2 py-2 text-left text-xs ${
                            selectedStaffName === session.staffName &&
                            !selectedDate
                              ? "bg-blue-100 text-blue-600"
                              : "text-gray-700 hover:bg-blue-50"
                          }`}
                        >
                          <ListCheck className="h-4 w-4 shrink-0" />

                          <span className="min-w-0 flex-1 truncate">
                            {session.staffName}
                          </span>

                          <span
                            className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                              status.color
                            }`}
                            title={status.label}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default RestaurantNavbar;
