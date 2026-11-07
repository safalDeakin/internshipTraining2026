import type { ButtonHTMLAttributes, ReactNode } from "react";

// 1. Allowed session modes
export type POSSessionMode =
  | "Standard"
  | "Over The Air"
  | "Manager Mode"
  | "Service and Technical Check";

// 2. Session lifecycle status
export type POSSessionStatus = "active" | "paused" | "ended";

// 3. POS Session data
export interface POSSession {
  id: string;
  staffId: string;
  staffName: string;
  terminal: string;
  date: string;
  mode: POSSessionMode;
  organizationId: string | number;

  // Session timing
  startTime: string;
  endTime: string | null;
  pausedAt?: string | null;

  // Session status
  status: POSSessionStatus;

  // Cash details
  openingCash: number;
  closingCash?: number;

  // Notes
  openingNotes?: string;
  closingNotes?: string;
  // Total time spent paused (milliseconds)
  totalPausedDurationMs?: number;

  // Verification
  isApproved: boolean;
  isVerified: boolean;
}

// 4. Session modal props
export interface SessionModeModalProps {
  onClose: () => void;

  onSelect?: (
    mode: POSSessionMode,
    data: {
      openingCash: number;
      notes: string;
    },
  ) => void;

  onEndSession?: () => void;
  onPause?: () => void;

  isSessionActive?: boolean;
  showActiveSessionOnly?: boolean;

  staffName: string;
  terminal: string;
  date: string;
  activeSessionStartTime?: string;
}

// 5. Different button props
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

// 6. POS User Session props
export interface POSUserSessionProps {
  onExit?: () => void;
  sessionMode?: POSSessionMode;
}

// 7. Two Panel Layout props
export interface TwoPanelLayoutProps {
  children: ReactNode;
  panel?: ReactNode;
  panelWidth?: string;

  header?: ReactNode;

  filters?: string[];
  activeFilter?: string;
  onFilterChange?: (value: string) => void;

  search?: string;
  onSearchChange?: (value: string) => void;
  onSearch?: () => void;
  searchPlaceholder?: string;

  onHistoryClick?: () => void;
}

// 8. Form Frame props
export interface FormFrameProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  className?: string;
}

// 9. Receipt Frame props
export interface ReceiptFrameProps {
  hotelName: string;
  address: string;
  phone?: string;
  children: ReactNode;
  onPrint?: () => void;
  onDownloadPDF?: () => void;
}

// 10. KOT Cancel types
export interface KOTCard {
  id: number;
  reference: string;
  invoiceItems: {
    id: number;
    name: string;
    quantity: number;
    amount: number;
  }[];
}

export interface KOTItem {
  id: string;
  name: string;
  qty: number;
  amount: number;
  reference: string;
}

export interface KOTCancelFormProps {
  cards: KOTCard[];
  onClose: () => void;
}
