//allowed session modes
export type POSSessionMode =
  | "Standard"
  | "Over The Air"
  | "Manager Mode"
  | "Service and Technical Check";

//the session data structure
export interface POSUserSession {
  id: number;
  staffId: number;
  staffName: string;
  terminal: string;
  date: string;
  mode: POSSessionMode;
  organizationId: number;
  startTime: string;
  endTime: string | null;
  isApproved: boolean;
  isVerified: boolean;
  isPaused?: boolean;
}
