import {
  CalendarCheck,
  ClipboardList,
  LayoutDashboard,
  Receipt,
  Undo2,
  Wallet,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import type { POSSessionMode } from "../types/posSessionTypes";
//1:
export const sessionModes: {
  label: string;
  value: POSSessionMode;
}[] = [
  { label: "Session Mode (Standard)", value: "Standard" },
  { label: "Over The Air", value: "Over The Air" },
  { label: "Manager Mode", value: "Manager Mode" },
  {
    label: "Service and Technical Check",
    value: "Service and Technical Check",
  },
];
//2:
export const tabs: {
  id: string;
  label: string;
  icon: LucideIcon;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "invoicing", label: "Invoicing", icon: Receipt },
  { id: "payments", label: "Payments", icon: Wallet },
  { id: "ordering", label: "Ordering", icon: ClipboardList },
  { id: "reservation", label: "Reservation", icon: CalendarCheck },
  { id: "return", label: "Return", icon: Undo2 },
  { id: "stock", label: "Stock", icon: Warehouse },
];
