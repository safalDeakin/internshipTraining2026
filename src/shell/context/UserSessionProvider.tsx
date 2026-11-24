import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { POSSession, POSSessionMode } from "../types/posSessionTypes";
import { useAuth } from "../../lib/utils/secureclient/useAuth";
import {
  POSSessionCmdService,
  POSSessionQueryService,
} from "../../application/services";

type Content =
  | "New Session Prompt"
  | "Continue Session Prompt"
  | "POSScreen"
  | "End Session Prompt";

//Stores all sessions and lifecycle functions and 	Receives new session through addSession()
interface POSUserSessionContextType {
  session?: POSSession;
  userName: string;
  content: Content;
  // Session lifecycle
  startNewSession: (
    mode: POSSessionMode,
    openingCash: number,
    notes: string,
  ) => void;
  pauseSession: () => void;
  continueSession: () => void;
  endSession: (closingCash: number, closingNote: string) => void;
}

export const UserSessionContext = createContext<
  POSUserSessionContextType | undefined
>(undefined);

interface UserSessionProviderProps {
  orgId: string;
  children: ReactNode;
}

export const UserSessionProvider = ({
  orgId,
  children,
}: UserSessionProviderProps) => {
  const { organization, user } = useAuth();
  const organizationId = organization?.id;
  // const staffId = "Safal";
  // const staffName = "Safal";
  const staffId = "STAFF-002";
  const staffName = "Sita Thapa";
  const currentDate = new Date();
  const [session, setSession] = useState<POSSession>();
  const [content, setContent] = useState<Content>(
    session == null ? "New Session Prompt" : "Continue Session Prompt",
  );
  // 1. Get the existing session using QueryService
  useEffect(() => {
    if (!orgId || !staffId) return;

    let cancelled = false;
    let unsubscribe: (() => void) | undefined;
    ////Create loadSession()
    //This requests all POS sessions from repository.
    const loadSession = async () => {
      try {
        const allSessions = await POSSessionQueryService.getAll();
        console.log("All POS Sessions:", allSessions);
        console.log("Total sessions:", allSessions.length);

        if (cancelled) return;
        //Filter the sessions
        // Find the current user's session in this organization
        const currentSession = allSessions
          .filter(
            (item) =>
              item.organizationId === orgId &&
              item.staffId === staffId &&
              (item.status === "active" || item.status === "paused"),
          )
          //Sorts the matching sessions from newest to oldest.
          .sort(
            (a, b) =>
              new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
          )[0];
        // /Update state
        setSession(currentSession);
        //Stores the selected session.
        setContent(
          currentSession ? "Continue Session Prompt" : "New Session Prompt",
        );
      } catch (error) {
        console.error("Failed to load POS session:", error);
      }
    };
    //Subscribe to repository changes
    const setupSubscription = async () => {
      try {
        // Listen for repository changes
        unsubscribe = await POSSessionQueryService.subscribe(() => {
          void loadSession();
        });

        if (cancelled) {
          unsubscribe();
          return;
        }

        // Load initial session
        await loadSession();
      } catch (error) {
        console.error("Session subscription failed:", error);
      }
    };

    void setupSubscription();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [orgId, staffId]);

  // 2. Start a new session using CommandService
  const startNewSession = async (
    mode: POSSessionMode,
    openingCash: number,
    notes: string,
  ) => {
    if (!user || !orgId) {
      throw new Error("User or organization not found");
    }

    const now = new Date();

    const newSession: POSSession = {
      id: crypto.randomUUID(),
      staffId,
      staffName,
      terminal: "Main Counter",
      date: now.toISOString().slice(0, 10),
      mode,
      organizationId: orgId,
      startTime: now.toISOString(),
      endTime: null,
      pausedAt: null,
      totalPausedDurationMs: 0,
      status: "active",
      isApproved: false,
      isVerified: false,
      openingCash,
      openingNotes: notes,
    };

    const success = await POSSessionCmdService.create(newSession);

    if (!success) {
      throw new Error("Failed to create POS session");
    }

    setSession(newSession);
    setContent("POSScreen");
  };

  // 3. Pause session using CommandService
  const pauseSession = async () => {
    if (!session || session.status !== "active") return;

    const now = new Date();

    const changes: Partial<POSSession> = {
      status: "paused",
      pausedAt: now.toISOString(),
    };

    const success = await POSSessionCmdService.update(session.id, changes);

    if (!success) {
      throw new Error("Failed to pause POS session");
    }

    setSession((previous) =>
      previous ? { ...previous, ...changes } : previous,
    );

    setContent("Continue Session Prompt");
  };

  // 4. Continue session using CommandService
  const continueSession = async () => {
    if (!session || session.status !== "paused") return;

    const now = new Date();

    const pausedDuration = session.pausedAt
      ? Math.max(0, now.getTime() - new Date(session.pausedAt).getTime())
      : 0;

    const changes: Partial<POSSession> = {
      status: "active",
      pausedAt: null,
      totalPausedDurationMs:
        (session.totalPausedDurationMs ?? 0) + pausedDuration,
    };

    const success = await POSSessionCmdService.update(session.id, changes);

    if (!success) {
      throw new Error("Failed to continue POS session");
    }

    setSession((previous) =>
      previous ? { ...previous, ...changes } : previous,
    );

    setContent("POSScreen");
  };

  // 5. End session using CommandService
  const endSession = async (closingCash: number, closingNote: string) => {
    if (!session || session.status === "ended") return;

    const now = new Date();

    const changes: Partial<POSSession> = {
      endTime: now.toISOString(),
      status: "ended",
      closingCash,
      closingNotes: closingNote,
    };

    const success = await POSSessionCmdService.update(session.id, changes);

    if (!success) {
      throw new Error("Failed to end POS session");
    }

    setSession((previous) =>
      previous ? { ...previous, ...changes } : previous,
    );

    setContent("New Session Prompt");
  };

  // const continueSession = () => {
  //   const now = new Date();

  //   const pausedDuration = session!.pausedAt
  //     ? Math.max(0, now.getTime() - new Date(session!.pausedAt).getTime())
  //     : 0;
  //   const currentSession = session!;
  //   currentSession!.totalPausedDurationMs =
  //     (currentSession.totalPausedDurationMs ?? 0) + pausedDuration;
  //   currentSession!.pausedAt = null;
  //   currentSession!.status = "active";
  //   setSession(currentSession);
  //   setContent("POSScreen");
  // };

  // const endSession = (closingCash: number, closingNote: string) => {
  //   const now = new Date();
  //   const currentSession = session!;
  //   currentSession.endTime = now.toISOString().slice(0, 10);
  //   currentSession.status = "ended";
  //   currentSession.closingCash = closingCash;
  //   currentSession.closingNotes = closingNote;
  //   setSession(currentSession);
  //   setContent("New Session Prompt");
  // };

  // const pauseSession = () => {
  //   const now = new Date();
  //   const currentSession = session!;
  //   currentSession.status = "paused";
  //   currentSession.pausedAt = now.toISOString();
  //   setSession(currentSession);
  //   setContent("Continue Session Prompt");
  // };

  // const startNewSession = (
  //   mode: POSSessionMode,
  //   openingCash: number,
  //   notes: string,
  // ) => {
  //   const newSession: POSSession = {
  //     id: crypto.randomUUID(),
  //     staffId: String(user?.id),
  //     staffName: user!.name,
  //     terminal: "Main Counter",
  //     date: currentDate.toISOString().slice(0, 10),
  //     mode,
  //     organizationId: orgId,
  //     startTime: currentDate.toISOString(),
  //     endTime: null,
  //     pausedAt: null,
  //     totalPausedDurationMs: 0,
  //     status: "active",
  //     isApproved: false,
  //     isVerified: false,
  //     openingCash: openingCash,
  //     openingNotes: notes,
  //   };
  //   setSession(newSession);
  //   setContent("POSScreen");
  // };

  return (
    <UserSessionContext.Provider
      value={{
        userName: staffName,
        session,
        content,
        startNewSession,
        pauseSession,
        continueSession,
        endSession,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};

//	Accesses the SessionProvider context	Returns query functions
//// Custom hook to access POS session context
export function useUserSession() {
  const context = useContext(UserSessionContext);

  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }

  return context;
}

export default UserSessionProvider;
