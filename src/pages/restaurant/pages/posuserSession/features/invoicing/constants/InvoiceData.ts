import type { InvoiceCards } from "../types/InvoiceTypes";

export const invoicingCards: InvoiceCards[] = [
  {
    id: 1,
    type: "KOT",
    reference: "KOT_125",
    name: "Ram Shrestha",
    number: "9841234567",
    waiter: "1",
    table: "1",
    time: "5:30 PM",
    invoiceItems: [
      { id: 1, name: "Steam MoMO", quantity: 1, amount: 350 },
      { id: 2, name: "Kothey MoMo", quantity: 1, amount: 800 },
      { id: 3, name: "Chicken Pizza", quantity: 1, amount: 250 },
      { id: 4, name: "Curry", quantity: 1, amount: 300 },
    ],
  },
  {
    id: 2,
    type: "BOT",
    reference: "BOT_125",
    name: "Sita Thapa",
    number: "9801234567",
    waiter: "2",
    table: "2",
    time: "5:45 PM",
    invoiceItems: [
      { id: 1, name: "Coke", quantity: 2, amount: 150 },
      { id: 2, name: "Beer", quantity: 3, amount: 900 },
    ],
  },
  {
    id: 3,
    type: "Reservation",
    reference: "Reservation_125",
    name: "Hari Karki",
    number: "9811122233",
    waiter: "1",
    table: "5",
    time: "6:00 PM",
    invoiceItems: [
      { id: 1, name: "Reservation fee", quantity: 1, amount: 1000 },
    ],
  },
  {
    id: 4,
    type: "KOT",
    reference: "KOT_126",
    name: "Maya Gurung",
    number: "9851098765",
    waiter: "3",
    table: "3",
    time: "6:10 PM",
    invoiceItems: [
      { id: 1, name: "Chowmein", quantity: 1, amount: 150 },
      { id: 2, name: "Momo", quantity: 2, amount: 200 },
    ],
  },
  {
    id: 5,
    type: "BOT",
    reference: "BOT_126",
    name: "Ram Shrestha",
    number: "9841234567",
    waiter: "1",
    table: "1",
    time: "6:20 PM",
    invoiceItems: [{ id: 1, name: "Lemon Soda", quantity: 2, amount: 160 }],
  },
];

export const INVOICE_FILTERS: string[] = ["All", "KOT", "BOT", "Reservation"];
