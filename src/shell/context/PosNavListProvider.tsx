import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { POSSession } from "../types/posSessionTypes";
import { POSSessionQueryService } from "../../application/services";

// Prepared data for navbar
export interface POSSessionNavItem {
  id: string;
  staffName: string;
  statusLabel: string;
  statusColor: string;
  session: POSSession;
}

// Sessions grouped by date
export interface POSSessionDateGroup {
  date: string;
  formattedDate: string;
  sessions: POSSessionNavItem[];
}

// Dates grouped by month
export interface POSSessionMonthGroup {
  key: string;
  label: string;
  dates: POSSessionDateGroup[];
}

// Context type
interface POSNavListContextType {
  sessions: POSSession[];

  selectedDate: string | undefined;
  selectedStaffName: string | undefined;

  setSelectedDate: (date: string | undefined) => void;
  setSelectedStaffName: (name: string | undefined) => void;

  getSessionById: (id: string) => POSSession | undefined;

  getLatestSession: (organizationId: string | number) => POSSession | undefined;

  getGroupedSessions: (
    organizationId: string | number,
  ) => POSSessionDateGroup[];

  getMonthlyGroupedSessions: (
    organizationId: string | number,
  ) => POSSessionMonthGroup[];
}

// Create context
const POSNavListContext = createContext<POSNavListContextType | undefined>(
  undefined,
);

// Provider props
interface POSNavListProviderProps {
  children: ReactNode;
}

export function POSNavListProvider({ children }: POSNavListProviderProps) {
  const [sessions, setSessions] = useState<POSSession[]>([]);

  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined,
  );

  const [selectedStaffName, setSelectedStaffName] = useState<
    string | undefined
  >(undefined);

  // Load sessions and listen for changes
  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    const loadSessions = async () => {
      try {
        const data = await POSSessionQueryService.getAll();

        if (!cancelled) {
          setSessions(data);
        }
      } catch (error) {
        console.error("Failed to load POS sessions:", error);
      }
    };

    const setupSubscription = async () => {
      try {
        unsubscribe = await POSSessionQueryService.subscribe(() => {
          void loadSessions();
        });

        if (cancelled) {
          unsubscribe();
          return;
        }

        await loadSessions();
      } catch (error) {
        console.error("POS session subscription failed:", error);
      }
    };

    void setupSubscription();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  // Get latest session for organization
  const getLatestSession = (
    organizationId: string | number,
  ): POSSession | undefined => {
    return sessions
      .filter(
        (session) => String(session.organizationId) === String(organizationId),
      )
      .sort(
        (a, b) =>
          new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
      )[0];
  };

  // Format date
  const formatSessionDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kathmandu",
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(`${date}T12:00:00+05:45`));
  };

  // Format month
  const formatSessionMonth = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kathmandu",
      month: "long",
      year: "numeric",
    }).format(new Date(`${date}T12:00:00+05:45`));
  };

  // Prepare session status
  const getSessionStatus = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
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

    return (
      statusMap[status] ?? {
        label: "Unknown",
        color: "bg-gray-400",
      }
    );
  };

  // Get session by ID
  const getSessionById = (id: string): POSSession | undefined => {
    return sessions.find((session) => String(session.id) === String(id));
  };

  // Filter, group, sort and prepare sessions by date
  const getGroupedSessions = (
    organizationId: string | number,
  ): POSSessionDateGroup[] => {
    const organizationSessions = sessions.filter(
      (session) => String(session.organizationId) === String(organizationId),
    );

    // Group sessions by YYYY-MM-DD
    const groups = organizationSessions.reduce<Record<string, POSSession[]>>(
      (result, session) => {
        const date = session.date.slice(0, 10);

        if (!result[date]) {
          result[date] = [];
        }

        result[date].push(session);

        return result;
      },
      {},
    );

    // Sort latest date first and prepare date groups
    return Object.entries(groups)
      .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
      .map(([date, dateSessions]) => ({
        date,
        formattedDate: formatSessionDate(date),

        sessions: dateSessions
          .sort(
            (a, b) =>
              new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
          )
          .map((session) => {
            const status = getSessionStatus(session.status);

            return {
              id: String(session.id),
              staffName: session.staffName,
              statusLabel: status.label,
              statusColor: status.color,
              session,
            };
          }),
      }));
  };

  // Group dates by month
  const getMonthlyGroupedSessions = (
    organizationId: string | number,
  ): POSSessionMonthGroup[] => {
    const dateGroups = getGroupedSessions(organizationId);

    const monthGroups = dateGroups.reduce<
      Record<string, POSSessionDateGroup[]>
    >((result, group) => {
      const monthKey = group.date.slice(0, 7);

      if (!result[monthKey]) {
        result[monthKey] = [];
      }

      result[monthKey].push(group);

      return result;
    }, {});

    // Sort latest month first
    return Object.entries(monthGroups)
      .sort(([monthA], [monthB]) => monthB.localeCompare(monthA))
      .map(([key, dates]) => ({
        key,
        label: formatSessionMonth(`${key}-01`),
        dates,
      }));
  };

  return (
    <POSNavListContext.Provider
      value={{
        sessions,
        selectedDate,
        selectedStaffName,
        setSelectedDate,
        setSelectedStaffName,
        getLatestSession,
        getSessionById,
        getGroupedSessions,
        getMonthlyGroupedSessions,
      }}
    >
      {children}
    </POSNavListContext.Provider>
  );
}

// Custom hook
export function usePOSNavList() {
  const context = useContext(POSNavListContext);

  if (!context) {
    throw new Error("usePOSNavList must be used within POSNavListProvider");
  }

  return context;
}

export default POSNavListProvider;
