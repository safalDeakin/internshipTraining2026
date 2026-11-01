export interface InvoiceLayoutProps {
  onTrackClick: () => void;
}

export type InvoiceType = "KOT" | "BOT" | "Reservation";

export interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  amount: number;
}

export interface InvoiceCards {
  id: number;
  type: InvoiceType;
  reference: string;
  name: string;
  number: string;
  waiter: string;
  table: string;
  time: string;
  invoiceItems: InvoiceItem[];
}

export type Invoicefilter = "All" | "KOT" | "BOT" | "Reservation";

export interface InvoicingCardsProps {
  type: InvoiceType;
  reference: string;
  name: string;
  number: string;
  waiter: string;
  table: string;
  time: string;
  itemCount: number;
  image?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

//
export interface InvoicingFormProps {
  customers: InvoiceCards[];
  onRemove: (id: number) => void;
  onClose: () => void;

  onGenerate?: (data: {
    guest: string;
    phone: string;
    references: string[];
    total: number;
  }) => void;

  onSplit?: () => void;
}

export interface SalesReceiptItem {
  name: string;
  quantity: number;
  amount: number;
}

export interface SalesReceiptData {
  receiptNo: string;
  customerName: string;
  phone: string;
  references: string[];
  items: SalesReceiptItem[];
  subtotal: number;
  vat: number;
  service: number;
  totalAmount: number;
  paidAmount: number;
  paymentMethod: string;
  dueDate: string;
}

export interface SalesReceiptProps {
  invoice: SalesReceiptData;
}

export interface ReceiptBill {
  billNo: number;
  invoiceDate: string;
  customerName: string;
  tableNo: string;
  paymentMethod: string;
  items: {
    id: string;
    name: string;
    qty: number;
    amount: number;
  }[];
  subtotal: number;
  vat: number;
  serviceCharge: number;
  total: number;
}

export interface SplitBillCard {
  id: number;
  reference: string;
  invoiceItems: {
    id: number;
    name: string;
    quantity: number;
    amount: number;
  }[];
}

export interface SplitBillFormProps {
  cards: SplitBillCard[];
  onClose?: () => void;
  onReceiptChange?: (open: boolean) => void;
}

export interface BillItem {
  id: string;
  name: string;
  qty: number;
  amt: number;
  billIndex: number;
}
export interface SplitBillReceiptItem {
  id: string;
  name: string;
  qty: number;
  amount: number;
}

export interface SplitBill {
  billNo: number;
  invoiceNo?: string | number;
  invoiceDate: string;
  customerName: string;
  tableNo: string;
  paymentMethod: string;
  items: SplitBillReceiptItem[];

  // Values received from backend
  amountPayable?: number;
  subtotal: number;
  vat: number;
  serviceCharge: number;
  total: number;
}

export interface SplitBillReceiptProps {
  bills: SplitBill[];
  onClose: () => void;
}
