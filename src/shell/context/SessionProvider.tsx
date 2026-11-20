import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import { usePOSUserSession } from "../hooks/usePOSUserSession";
import type { POSSession } from "../types/posSessionTypes";

//Provides session filtering and query functions	Reads sessions using usePOSUserSession()
interface SessionContextType {
  //All sessions
  sessions: POSSession[];
  //Sessions whose date matches the given day
  getSessionDate: (date: string) => POSSession[];

  getSessions: (date: string) => POSSession[];
  //One session by id, or undefined
  getSessionDetail: (sessionId: string) => POSSession | undefined;
  //All sessions for one staff member
  getStaffSessions: (staffId: string) => POSSession[];
  // true if that session’s status === "active"
  checkIfSessionIsActive: (sessionId: string) => boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}
//helper
// Today's date as YYYY-MM-DD in Kathmandu time.
const getTodayKey = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kathmandu" }).format(
    new Date(),
  );
export function SessionProvider({ children }: SessionProviderProps) {
  const { sessions } = usePOSUserSession();

  const getSessions = useCallback(
    (date: string) =>
      sessions.filter(
        (session) => session.date.slice(0, 10) === date.slice(0, 10),
      ),
    [sessions],
  );

  const getSessionDate = getSessions;

  const getSessionDetail = useCallback(
    (sessionId: string) => sessions.find((session) => session.id === sessionId),
    [sessions],
  );

  const getStaffSessions = useCallback(
    (staffId: string) =>
      sessions.filter((session) => String(session.staffId) === String(staffId)),
    [sessions],
  );

  const checkIfSessionIsActive = useCallback(
    (sessionId: string) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (!session) return false;

      return (
        session.status === "active" &&
        session.endTime == null &&
        session.date.slice(0, 10) === getTodayKey()
      );
    },
    [sessions],
  );

  const value = useMemo(
    () => ({
      sessions,
      getSessionDate,
      getSessions,
      getSessionDetail,
      getStaffSessions,
      checkIfSessionIsActive,
    }),
    [
      sessions,
      getSessionDate,
      getSessions,
      getSessionDetail,
      getStaffSessions,
      checkIfSessionIsActive,
    ],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
//	Accesses the SessionProvider context	Returns query functions
export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }

  return context;
}
