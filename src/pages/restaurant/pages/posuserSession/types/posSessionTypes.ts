import type { ButtonHTMLAttributes, ReactNode } from "react";

//1: allowed session modes
export type POSSessionMode =
  | "Standard"
  | "Over The Air"
  | "Manager Mode"
  | "Service and Technical Check";

// 2://Sessionmodal props
// export interface SessionModeModalProps {
//   onClose: () => void;
//   onSelect?: (mode: POSSessionMode) => void;
//   onEndSession?: () => void;
//   onPause?: () => void;
//   isSessionActive?: boolean;
//   staffName: string;
//   terminal: string;
//   date: string;
//   activeSessionStartTime?: string;
// }
export interface SessionModeModalProps {
  onClose: () => void;
  onSelect?: (
    mode: POSSessionMode,
    data: { openingCash: number; notes: string },
  ) => void;
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
  sessionMode?: POSSessionMode;
}

//properties that layout accepts
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
  phone?: string;
  children: ReactNode;
  onPrint?: () => void;
  onDownloadPDF?: () => void;
}

//Cancel process
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
