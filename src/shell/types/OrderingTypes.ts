import type { ReactNode } from "react";
import type { ORDER_FILTERS } from "../constants/OrderData";
import type { InvoiceType } from "./InvoiceTypes";

// ================= ORDERING =================

export interface OrderingLayoutProps {
  onTrackClick: () => void;
}

export type FoodItem = {
  id: number;
  image?: string;
  label: string;
  date: string;
  status?: string;
  type: "food" | "beverage" | "extra";
};

export type Orderfilter = (typeof ORDER_FILTERS)[number];

export interface FoodCardProps {
  image?: string;
  label: string;
  date: string;
  status?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

// ================= ORDER LINE =================

export type OrderLine = FoodItem & {
  qty: number;
};

// ================= ORDER FORM =================

export interface OrderFormProps {
  orderedItems: OrderLine[];
  kotItems: OrderLine[];
  botItems: OrderLine[];
  onChangeQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onClose: () => void;
  onOrderSuccess: () => void;
}

export interface OrderSectionProps {
  title: "KOT" | "BOT";
  items: OrderLine[];
  onChangeQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

// ================= RECEIPT =================

export interface ReceiptItem {
  id: number;
  label: string;
  qty: number;
  remarks?: string;
}

export interface OrderReceiptProps {
  restaurantName: string;
  address: string;
  restaurantPhone: string;
  orderNo: string;
  date: string;
  customerName: string;
  phone: string;
  location: string;
  kotItems: ReceiptItem[];
  botItems: ReceiptItem[];
  onDownloadPDF?: () => void;
}

// ================= HISTORY =================

export interface ReusableDropdownProps {
  label?: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

// Keep this only if other existing components still use it.
export interface HistoryItem {
  type: InvoiceType;
  reference: string;
  name: string;
  number: string;
  waiter: string;
  table: string;
  time: string;
  itemCount: number;
  invoiceItems: {
    id: number;
    name: string;
    quantity: number;
    amount: number;
  }[];
}

export interface OrderHistoryProps {
  onBack: () => void;
}

// ================= ORDER HISTORY CARDS =================

export type OrderType = "Order";

export interface OrderInvoiceItem {
  id: number;
  name: string;
  quantity: number;
}

export interface OrderCardData {
  id: string;
  type: OrderType;
  reference: string;
  phone: string;
  waiter: string;
  customerName: string;
  table: string;
  time: string;
  invoiceItems: OrderInvoiceItem[];
}

export interface OrderCardProps {
  order: OrderCardData;
  onCancel: (order: OrderCardData) => void;
  cancelLabel?: string;
}

export interface OrderCardGridProps {
  orders: OrderCardData[];
  renderCancelProcess?: (order: OrderCardData, close: () => void) => ReactNode;
  className?: string;
}

// ================= ORDER QUERY MODEL =================

export interface Order {
  id: string;
  orderNo: string;

  customerName: string;
  phone: string;
  referenceNumber: string;
  location: string;

  waiter: string;
  table: string;

  items: OrderLine[];

  status: "Pending" | "Completed" | "Cancelled";
  createdAt: string;
}
