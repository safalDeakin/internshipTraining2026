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
//----------------------------------------------------------------------------------------------------------

//POSUser session first
export interface POSUserSessionProps {
  onExit?: () => void;
}

//properties that layout accepts
export interface TwoPanelLayoutProps {
  // Main content
  children: ReactNode;

  // Right-side panel
  panel?: ReactNode;
  panelWidth?: string;

  // Filter configuration
  filters?: readonly string[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;

  // Search configuration
  search?: string;
  onSearchChange?: (value: string) => void;
  onSearch?: () => void;
  searchPlaceholder?: string;

  // History button
  onHistoryClick?: () => void;
}

//formframe
export interface FormFrameProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  className?: string;
}
//receipt
export interface ReceiptFrameProps {
  hotelName: string;
  address: string;
  phone: string;
  children: ReactNode;
  onPrint?: () => void;
  onDownloadPDF?: () => void;
}

// export const INVOICE_FILTERS = [
//   "All",
//   "KOT",
//   "BOT",
//   "Reservation",
// ] as const;

// export type InvoiceFilter = (typeof INVOICE_FILTERS)[number];
