import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { POSSession, POSSessionMode } from "../types/posSessionTypes";
import { useAuth } from "../../lib/utils/secureclient/useAuth";

type Content = 'New Session Prompt' | 'Continue Session Prompt' | 'POSScreen' | 'End Session Prompt';

//Stores all sessions and lifecycle functions and 	Receives new session through addSession()
interface POSUserSessionContextType {
  session?: POSSession;
  userName: string;
  content: Content;
  // Session lifecycle
  startNewSession: (mode: POSSessionMode, openingCash: number, notes: string) => void;
  pauseSession: () => void;
  continueSession: () => void;
  endSession: (closingCash: number, closingNote: string) => void;
}

export const UserSessionContext = createContext<POSUserSessionContextType>();

interface UserSessionProviderProps {
  orgId: string
  children: ReactNode;
}



export const UserSessionProvider = ({
  orgId, children,
}: UserSessionProviderProps) => {

  const { organization, user } = useAuth();
  const organizationId = organization?.id;
  const staffId = 'Safal';
  const staffName = 'Safal';

  const currentDate = new Date();
  const [session, setSession] = useState<POSSession>();
  const [content, setContent] = useState<Content>(
    session == null ? 'New Session Prompt' : 'Continue Session Prompt'
  );

  const startNewSession = (mode: POSSessionMode, openingCash: number, notes: string) => {
    const newSession: POSSession = {
      id: crypto.randomUUID(),
      staffId: String(user?.id),
      staffName: user!.name,
      terminal: "Main Counter",
      date: currentDate.toISOString().slice(0, 10),
      mode,
      organizationId: orgId,
      startTime: currentDate.toISOString(),
      endTime: null,
      pausedAt: null,
      totalPausedDurationMs: 0,
      status: "active",
      isApproved: false,
      isVerified: false,
      openingCash: openingCash,
      openingNotes: notes,
    };
    setSession(newSession);
    setContent('POSScreen');
  }

  const continueSession = () => {
    const now = new Date();

    const pausedDuration = session!.pausedAt
      ? Math.max(0, now.getTime() - new Date(session!.pausedAt).getTime())
      : 0;
    const currentSession = session!;
    currentSession!.totalPausedDurationMs = (currentSession.totalPausedDurationMs ?? 0) + pausedDuration;
    currentSession!.pausedAt = null;
    currentSession!.status = 'active';
    setSession(currentSession);
    setContent('POSScreen');
  };

  const endSession = (closingCash: number, closingNote: string) => {
    const now = new Date();
    const currentSession = session!;
    currentSession.endTime = now.toISOString().slice(0, 10);
    currentSession.status = 'ended';
    currentSession.closingCash = closingCash;
    currentSession.closingNotes = closingNote;
    setSession(currentSession);
    setContent('New Session Prompt');
  }

  const pauseSession = () => {
    const now = new Date();
    const currentSession = session!;
    currentSession.status = 'paused';
    currentSession.pausedAt = now.toISOString();
    setSession(currentSession);
    setContent('Continue Session Prompt');
  }

  return (
    <UserSessionContext.Provider value={{ userName: staffName, session, content, startNewSession, pauseSession, continueSession, endSession }}>
      {children}
    </UserSessionContext.Provider>
  );
};

//	Accesses the SessionProvider context	Returns query functions
export function useUserSession() {
  const context = useContext(UserSessionContext);

  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }

  return context;
}

export default UserSessionProvider;