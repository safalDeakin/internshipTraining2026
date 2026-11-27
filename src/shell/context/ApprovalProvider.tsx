import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { ApprovalCard } from "../features/types/ApprovalTypes";
import { useSubscription } from "../../application/useSubscription";
import {
  ApprovalCmdService,
  ApprovalQueryService,
} from "../../application/services";

interface ApprovalContextType {
  approvals: ApprovalCard[];
  loading: boolean;
  error: string | null;
  createApproval: (approval: ApprovalCard) => Promise<void>;
  updateApproval: (id: string, changes: Partial<ApprovalCard>) => Promise<void>;
  removeApproval: (id: string) => Promise<void>;
}

const ApprovalContext = createContext<ApprovalContextType | undefined>(
  undefined,
);

interface ApprovalProviderProps {
  children: ReactNode;
}

export const ApprovalProvider = ({ children }: ApprovalProviderProps) => {
  const { data, loading, error } = useSubscription<ApprovalCard, string>(
    ApprovalQueryService,
  );

  const approvals = data ?? [];

  const createApproval = async (approval: ApprovalCard) => {
    await ApprovalCmdService.create(approval);
  };

  const updateApproval = async (id: string, changes: Partial<ApprovalCard>) => {
    await ApprovalCmdService.update(id, changes);
  };

  const removeApproval = async (id: string) => {
    await ApprovalCmdService.delete(id);
  };

  const value = useMemo(
    () => ({
      approvals,
      loading,
      error: error
        ? error instanceof Error
          ? error.message
          : String(error)
        : null,
      createApproval,
      updateApproval,
      removeApproval,
    }),
    [approvals, loading, error],
  );

  if (loading) {
    return <div className="p-4">Loading approvals...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Failed to load approvals.</div>;
  }

  return (
    <ApprovalContext.Provider value={value}>
      {children}
    </ApprovalContext.Provider>
  );
};

export const useApproval = () => {
  const context = useContext(ApprovalContext);

  if (!context) {
    throw new Error("useApproval must be used inside ApprovalProvider");
  }

  return context;
};
