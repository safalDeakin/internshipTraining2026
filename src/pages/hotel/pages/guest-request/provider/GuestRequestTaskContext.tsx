// GuestRequestTaskContext.tsx

import { createContext } from "react";

export type TaskStatus = "New" | "Completed";

export interface GuestRequestTaskContextType {
  //Retrieves task details
  getStatus: (requestId: string) => TaskStatus;
  //Updates task details
  updateStatus: (requestId: string, status: TaskStatus) => void;
}

const GuestRequestTaskContext =
  createContext<GuestRequestTaskContextType | null>(null);

export default GuestRequestTaskContext;
