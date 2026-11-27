import type { PaymentMethod } from "../../shared/components/PaymentMethodFields";

export interface PaymentLayoutProps {
  onTrackClick: () => void;
}

// Invoice Item
export interface PaymentItem {
  name: string;
  quantity: number;
  amount: number;
}

// Customer Payment Card
export interface PaymentCard {
  id?: number;
  image?: string;
  name?: string;
  email?: string;
  number?: string;
  payment?: string;
  invoice?: string[];
  items?: PaymentItem[];
}

export interface PaymentCardsProps {
  id?: number;
  image?: string;
  name?: string;
  number?: string;
  payment?: string;
  invoice?: string[];
  isSelected?: boolean;
  onClick?: () => void;
}

export interface PaymentFormProps {
  customer: PaymentCard;
  onCancel: () => void;
}

export interface PaymentData {
  customer: PaymentCard;
  total: number;
  paymentMethod: PaymentMethod;
  receivedAmount: number;
  vatAmount: number;
  serviceCharge: number;
  grandTotal: number;
}

export interface PaymentReceiptProps {
  customer: PaymentCard;
  total: number;
  paymentMethod: string;
  receivedAmount: number;
  vatAmount?: number;
  serviceCharge?: number;
  grandTotal: number;
  receivedBy?: string;
  onClose: () => void;
  onDownloadPDF?: () => void;
}

// History
export interface PaymentHistoryProps {
  onBack: () => void;
}

export interface InvoiceRow {
  invoiceNumber: string;
  invoiceDate: string;
  dueAmount: string;
  paidAmount: string;
}

export interface Receipt {
  id: number;
  receiptNo: string;
  type: string;
  date: string;
  listDate: string;
  customerName: string;
  phone: string;
  address: string;
  invoices: string[];
  chequeNumber: string;
  bankName: string;
  note: string;
  active?: boolean;
  invoiceRows: InvoiceRow[];
}
