// Refund item type
export interface RefundItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  amount: number;
}

export interface RefundReceiptItem {
  id: number;
  name: string;
  quantity: number;
  amount: number;
}

export interface RefundReceiptData {
  refundNumber: string;
  invoiceNumber: string;
  dateTime: string;
  processedBy: string;
  items: RefundReceiptItem[];
  totalAmount: number;
  refundMethod: string;
}

export interface RefundReceiptModalProps {
  open: boolean;
  onClose: () => void;
  data: RefundReceiptData | null;
}
