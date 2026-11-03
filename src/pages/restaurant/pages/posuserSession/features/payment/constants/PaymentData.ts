import type { PaymentCard, Receipt } from "../types/PaymentTypes";

export const paymentCards: PaymentCard[] = [
  {
    id: 1,
    name: "Ram Sharma",
    number: "9841234567",
    payment: "500",
    invoice: ["INV-001", "INV-002", "INV-003"],
  },
  {
    id: 2,
    name: "Sita Thapa",
    number: "9801234567",
    payment: "5000",
    invoice: ["INV-004", "INV-005"],
  },
  {
    id: 3,
    name: "Hari Gurung",
    number: "9860123456",
    payment: "3533",
    invoice: ["INV-006", "INV-007", "INV-008", "INV-009"],
  },
  {
    id: 4,
    name: "Rita Karki",
    number: "9812345678",
    payment: "333",
    invoice: ["INV-010"],
  },
  {
    id: 5,
    name: "Suman Tamang",
    number: "9851234567",
    payment: "900",
    invoice: ["INV-011", "INV-012", "INV-013"],
  },
];

//history
export const receipts: Receipt[] = [
  {
    id: 1,
    receiptNo: "#R_555",
    type: "Cheque",
    date: "2024/12/13",
    listDate: "24/03/2024",
    customerName: "Ram Shrestha",
    phone: "9876543210",
    address: "Pokhara",
    invoices: ["INV_101", "INV_102", "INV_103"],
    chequeNumber: "#1234",
    bankName: "NIC Asia",
    note: "Amount received, Balance cleared",
    active: true,
    invoiceRows: [
      {
        invoiceNumber: "INV_101",
        invoiceDate: "2024/12/01",
        dueAmount: "Rs 500",
        paidAmount: "Rs 500",
      },
      {
        invoiceNumber: "INV_102",
        invoiceDate: "2024/12/05",
        dueAmount: "Rs 300",
        paidAmount: "Rs 300",
      },
      {
        invoiceNumber: "INV_103",
        invoiceDate: "2024/12/09",
        dueAmount: "Rs 200",
        paidAmount: "Rs 200",
      },
    ],
  },
  {
    id: 2,
    receiptNo: "#R_554",
    type: "Cash",
    date: "2023/11/11",
    listDate: "11/03/2023",
    customerName: "Prakash Periyar",
    phone: "9801234567",
    address: "Kathmandu",
    invoices: ["INV_098"],
    chequeNumber: "-",
    bankName: "-",
    note: "Paid in full",
    invoiceRows: [
      {
        invoiceNumber: "INV_098",
        invoiceDate: "2023/11/02",
        dueAmount: "Rs 1200",
        paidAmount: "Rs 1200",
      },
    ],
  },
  {
    id: 3,
    receiptNo: "#R_5553",
    type: "Cheque",
    date: "2023/11/11",
    listDate: "11/03/2023",
    customerName: "Pramod Agrawal",
    phone: "9860123456",
    address: "Butwal",
    invoices: ["INV_090", "INV_091"],
    chequeNumber: "#5678",
    bankName: "Nabil Bank",
    note: "Partial payment",
    invoiceRows: [
      {
        invoiceNumber: "INV_090",
        invoiceDate: "2023/10/20",
        dueAmount: "Rs 700",
        paidAmount: "Rs 400",
      },
      {
        invoiceNumber: "INV_091",
        invoiceDate: "2023/10/25",
        dueAmount: "Rs 900",
        paidAmount: "Rs 0",
      },
    ],
  },
];
