import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { POSSession } from "../types/posSessionTypes";

// Context methods
interface POSUserSessionContextType {
  sessions: POSSession[];

  // Session creation and update
  addSession: (session: POSSession) => void;
  updateSession: (id: string, updates: Partial<POSSession>) => void;

  // Session lookup
  getActiveSession: (organizationId: string | number) => POSSession | undefined;

  getPausedSession: (organizationId: string | number) => POSSession | undefined;

  getLatestSession: (organizationId: string | number) => POSSession | undefined;

  // Session lifecycle
  pauseSession: (id: string) => void;

  resumeSession: (id: string) => void;

  endSession: (id: string, closingCash: number, closingNotes?: string) => void;
}

export const POSUserSessionContext = createContext<
  POSUserSessionContextType | undefined
>(undefined);

interface POSUserSessionProviderProps {
  children: ReactNode;
}

export const POSUserSessionProvider = ({
  children,
}: POSUserSessionProviderProps) => {
  const [sessions, setSessions] = useState<POSSession[]>([]);

  // 1. Add a new session
  const addSession = useCallback((session: POSSession) => {
    setSessions((previous) => {
      const existingSession = previous.some(
        (item) =>
          String(item.organizationId) === String(session.organizationId) &&
          String(item.staffId) === String(session.staffId) &&
          (item.status === "active" || item.status === "paused"),
      );

      if (existingSession) {
        return previous;
      }

      return [...previous, session];
    });
  }, []);

  // 2. Update an existing session
  const updateSession = useCallback(
    (id: string, updates: Partial<POSSession>) => {
      setSessions((previous) =>
        previous.map((session) =>
          session.id === id ? { ...session, ...updates } : session,
        ),
      );
    },
    [],
  );

  // 3. Get active session
  const getActiveSession = useCallback(
    (organizationId: string | number) =>
      sessions.find(
        (session) =>
          String(session.organizationId) === String(organizationId) &&
          session.status === "active",
      ),
    [sessions],
  );

  // 4. Get paused session
  const getPausedSession = useCallback(
    (organizationId: string | number) =>
      sessions.find(
        (session) =>
          String(session.organizationId) === String(organizationId) &&
          session.status === "paused",
      ),
    [sessions],
  );

  // 5. Get latest session
  const getLatestSession = useCallback(
    (organizationId: string | number) =>
      sessions
        .filter(
          (session) =>
            String(session.organizationId) === String(organizationId),
        )
        .sort(
          (a, b) =>
            new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
        )[0],
    [sessions],
  );

  // 6. Pause session
  const pauseSession = useCallback((id: string) => {
    setSessions((previous) =>
      previous.map((session) =>
        session.id === id && session.status === "active"
          ? {
              ...session,
              status: "paused",
              pausedAt: new Date().toISOString(),
            }
          : session,
      ),
    );
  }, []);

  // 7. Resume paused session
  const resumeSession = useCallback((id: string) => {
    const now = new Date();

    setSessions((previous) =>
      previous.map((session) => {
        if (session.id !== id || session.status !== "paused") {
          return session;
        }

        const pausedDuration = session.pausedAt
          ? Math.max(0, now.getTime() - new Date(session.pausedAt).getTime())
          : 0;

        return {
          ...session,
          status: "active",
          pausedAt: null,
          totalPausedDurationMs:
            (session.totalPausedDurationMs ?? 0) + pausedDuration,
        };
      }),
    );
  }, []);

  // 8. End session
  const endSession = useCallback(
    (id: string, closingCash: number, closingNotes = "") => {
      const now = new Date();

      setSessions((previous) =>
        previous.map((session) => {
          if (session.id !== id || session.status === "ended") {
            return session;
          }

          // Include any final paused duration
          const additionalPausedDuration =
            session.status === "paused" && session.pausedAt
              ? Math.max(
                  0,
                  now.getTime() - new Date(session.pausedAt).getTime(),
                )
              : 0;

          return {
            ...session,
            status: "ended",
            endTime: now.toISOString(),
            pausedAt: null,
            closingCash,
            closingNotes,
            totalPausedDurationMs:
              (session.totalPausedDurationMs ?? 0) + additionalPausedDuration,
          };
        }),
      );
    },
    [],
  );

  // Context value
  const value = useMemo(
    () => ({
      sessions,
      addSession,
      updateSession,
      getActiveSession,
      getPausedSession,
      getLatestSession,
      pauseSession,
      resumeSession,
      endSession,
    }),
    [
      sessions,
      addSession,
      updateSession,
      getActiveSession,
      getPausedSession,
      getLatestSession,
      pauseSession,
      resumeSession,
      endSession,
    ],
  );

  return (
    <POSUserSessionContext.Provider value={value}>
      {children}
    </POSUserSessionContext.Provider>
  );
};
