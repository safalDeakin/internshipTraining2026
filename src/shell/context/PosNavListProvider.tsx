// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   type ReactNode,
// } from "react";

// import type { POSSession } from "../types/posSessionTypes";
// import { POSSessionQueryService } from "../../application/services";

// // 1. Context type
// interface POSNavListContextType {
//   sessions: POSSession[];

//   selectedDate: string | null;
//   selectedStaffName: string | null;

//   setSelectedDate: (date: string | null) => void;
//   setSelectedStaffName: (name: string | null) => void;

//   getLatestSession: (organizationId: string | number) => POSSession | undefined;
// }

// // 2. Create Context
// const POSNavListContext = createContext<POSNavListContextType | undefined>(
//   undefined,
// );

// // 3. Provider
// interface POSNavListProviderProps {
//   children: ReactNode;
// }

// export function POSNavListProvider({ children }: POSNavListProviderProps) {
//   const [sessions, setSessions] = useState<POSSession[]>([]);

//   const [selectedDate, setSelectedDate] = useState<string | null>(null);

//   const [selectedStaffName, setSelectedStaffName] = useState<string | null>(
//     null,
//   );

//   // 4. Load all POS sessions
//   useEffect(() => {
//     let cancelled = false;
//     let unsubscribe: (() => void) | undefined;

//     const loadSessions = async () => {
//       try {
//         const data = await POSSessionQueryService.getAll();

//         if (!cancelled) {
//           setSessions(data);
//         }
//       } catch (error) {
//         console.error("Failed to load POS sessions:", error);
//       }
//     };

//     // Subscribe to repository changes
//     const setupSubscription = async () => {
//       try {
//         unsubscribe = await POSSessionQueryService.subscribe(() => {
//           void loadSessions();
//         });

//         if (cancelled) {
//           unsubscribe();
//           return;
//         }

//         await loadSessions();
//       } catch (error) {
//         console.error("POS session subscription failed:", error);
//       }
//     };

//     void setupSubscription();

//     return () => {
//       cancelled = true;
//       unsubscribe?.();
//     };
//   }, []);

//   // 5. Get latest session for an organization
//   const getLatestSession = (
//     organizationId: string | number,
//   ): POSSession | undefined => {
//     return sessions
//       .filter(
//         (session) => String(session.organizationId) === String(organizationId),
//       )
//       .sort(
//         (a, b) =>
//           new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
//       )[0];
//   };

//   // 6. Provide values
//   return (
//     <POSNavListContext.Provider
//       value={{
//         sessions,
//         selectedDate,
//         selectedStaffName,
//         setSelectedDate,
//         setSelectedStaffName,
//         getLatestSession,
//       }}
//     >
//       {children}
//     </POSNavListContext.Provider>
//   );
// }

// // 7. Custom Hook
// export function usePOSNavList() {
//   const context = useContext(POSNavListContext);

//   if (!context) {
//     throw new Error("usePOSNavList must be used within POSNavListProvider");
//   }

//   return context;
// }

// export default POSNavListProvider;

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

export interface POSSessionDateGroup {
  date: string;
  formattedDate: string;
  sessions: POSSessionNavItem[];
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
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [selectedStaffName, setSelectedStaffName] = useState<string | undefined>(
    undefined,
  );

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

  const getSessionById = (id: string): POSSession | undefined => {
    if (sessions != null && sessions.length > 0) {
      sessions.forEach((session) => {
        if (session.id == id) {
          return session;
        }
      });
    }
    return undefined;
  }
  // Filter, group, sort and prepare sessions for navbar
  const getGroupedSessions = (
    organizationId: string | number,
  ): POSSessionDateGroup[] => {
    const organizationSessions = sessions.filter(
      (session) => String(session.organizationId) === String(organizationId),
    );

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

    return Object.entries(groups)
      .sort(([a], [b]) => b.localeCompare(a))
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
              id: session.id,
              staffName: session.staffName,
              statusLabel: status.label,
              statusColor: status.color,
              session,
            };
          }),
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
