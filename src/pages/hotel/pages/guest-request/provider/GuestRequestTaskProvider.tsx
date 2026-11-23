import { createContext, useContext, useState, type ReactNode } from "react";

export type TaskStatus = "New" | "Assigned" | "Completed";

export interface TaskDetails {
  status: TaskStatus;
  assignedTo: string;
  completionNote: string;
}

interface GuestRequestTaskContextType {
  getTaskDetails: (requestId: string) => TaskDetails;
  updateTaskDetails: (requestId: string, details: TaskDetails) => void;
}

const GuestRequestTaskContext =
  createContext<GuestRequestTaskContextType | null>(null);

export const GuestRequestTaskProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [tasks, setTasks] = useState<Record<string, TaskDetails>>({});

  const getTaskDetails = (requestId: string): TaskDetails => {
    return (
      tasks[requestId] ?? {
        status: "New",
        assignedTo: "",
        completionNote: "",
      }
    );
  };

  const updateTaskDetails = (requestId: string, details: TaskDetails) => {
    setTasks((prev) => ({
      ...prev,
      [requestId]: details,
    }));
  };

  return (
    <GuestRequestTaskContext.Provider
      value={{ getTaskDetails, updateTaskDetails }}
    >
      {children}
    </GuestRequestTaskContext.Provider>
  );
};

export const useGuestRequestTask = () => {
  const context = useContext(GuestRequestTaskContext);

  if (!context) {
    throw new Error(
      "useGuestRequestTask must be used inside GuestRequestTaskProvider",
    );
  }

  return context;
};
