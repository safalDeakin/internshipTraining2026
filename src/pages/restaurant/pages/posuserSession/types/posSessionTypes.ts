import type { ButtonHTMLAttributes, ReactNode } from "react";

//1: allowed session modes
export type POSSessionMode =
  | "Standard"
  | "Over The Air"
  | "Manager Mode"
  | "Service and Technical Check";

// 2://Sessionmodal props
export interface SessionModeModalProps {
  onClose: () => void;
  onSelect?: (mode: POSSessionMode) => void;
  onEndSession?: () => void;
  onPause?: () => void;
  isSessionActive?: boolean;
  staffName: string;
  terminal: string;
  date: string;
  activeSessionStartTime?: string;
}

//4://Differt buttonprops
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}
//
export interface POSUserSessionProps {
  onExit?: () => void;
}
// 3://the session data structure
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
