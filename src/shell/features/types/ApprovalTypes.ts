export interface ApprovalCard {
  id: number;
  requestType: string;
  requestNo: string;
  amount: string;
  requestedAgo: string;
  status: "Pending" | "Overdue";
  requestedBy: string;

  // Additional details
  customerName?: string;
  originalAmount?: string;
  paymentMethod?: string;
  reason?: string;
  note?: string;
}

export interface ApprovalRow {
  invoiceNumber: string;
  invoiceDate: string;
  dueAmount: string;
  paidAmount: string;
}
export interface ApprovalDoc {
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
  invoiceRows: ApprovalRow[];
}
