//author:Shrajja
//React Context to manage POS user sessions globally
import { createContext, useState, type ReactNode } from "react";
import type { POSUserSession } from "../types/POSUserSession";

//what data and functions the context provides.
interface POSUserSessionContextType {
  sessions: POSUserSession[]; //Stores the array of all POS sessions.
  //what values the function accepts when updating the session list.
  setSessions: React.Dispatch<React.SetStateAction<POSUserSession[]>>;
  addSession: (session: POSUserSession) => void;
  //means you can update only some fields instead of providing the entire session.
  updateSession: (id: number, updates: Partial<POSUserSession>) => void;
  removeSession: (id: number) => void; //Accepts an ID and removes the session with that ID.
}
//store to shrare data for multiple components
export const POSUserSessionContext = createContext<
  POSUserSessionContextType | undefined
>(undefined);

interface POSUserSessionProviderProps {
  children: ReactNode;
}
export const POSUserSessionProvider = ({
  children,
}: POSUserSessionProviderProps) => {
  const [sessions, setSessions] = useState<POSUserSession[]>([]);
  //Adding a session
  const addSession = (session: POSUserSession) => {
    setSessions((previous) => [...previous, session]);
  };
  //finds a session by ID and updates its fields
  const updateSession = (id: number, updates: Partial<POSUserSession>) => {
    setSessions((previous) =>
      previous.map((session) =>
        session.id === id ? { ...session, ...updates } : session,
      ),
    );
  };
  const removeSession = (id: number) => {
    setSessions((previous) => previous.filter((session) => session.id !== id));
  };
  //value passes like interface
  //for all components
  return (
    <POSUserSessionContext.Provider
      value={{
        sessions,
        setSessions,
        addSession,
        updateSession,
        removeSession,
      }}
    >
      {children}
    </POSUserSessionContext.Provider>
  );
};
