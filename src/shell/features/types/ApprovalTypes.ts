
export interface ApprovalCard {
    id?: number;
    image?: string;
    name?: string;
    email?: string;
    number?: string;
    payment?: string;
    invoice?: string[];
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