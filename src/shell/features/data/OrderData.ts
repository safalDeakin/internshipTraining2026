import type { FoodItem, HistoryItem } from "../types/OrderingTypes";

// Mock data for ordering frot page
export const foodItems: FoodItem[] = [
  {
    id: 1,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
    status: "N/A",
    type: "food",
  },
  {
    id: 2,
    image: "/images.jpg",
    label: "MoMo",
    date: "2080/01/22",
    type: "food",
  },
  { id: 3, label: "Mojito", date: "2083/01/22", type: "beverage" },
  {
    id: 4,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
    type: "extra",
  },
  {
    id: 5,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
    type: "food",
  },
  {
    id: 6,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "extra",
  },
  {
    id: 7,
    image: "/images.jpg",
    label: "Coke",
    date: "2083/01/22",
    type: "beverage",
  },
  {
    id: 8,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "food",
  },
  {
    id: 9,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    status: "N/A",
    type: "food",
  },
  {
    id: 10,
    label: "Coke",
    date: "2083/01/22",
    status: "N/A",
    type: "beverage",
  },
  {
    id: 11,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "extra",
  },
  {
    id: 12,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "food",
  },
  {
    id: 13,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "food",
  },
  {
    id: 14,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "food",
  },
];

///for filter at top of page
export const ORDER_FILTERS = ["All", "Food", "Drinks", "Extras"];

//// History data
export const historyItems: HistoryItem[] = [
  {
    type: "KOT",
    reference: "INV-001",
    name: "Ram Sharma",
    number: "9800000001",
    waiter: "01",
    table: "1",
    time: "10:30 AM",
    itemCount: 3,
    invoiceItems: [
      { id: 1, name: "Chicken Momo", quantity: 2, amount: 300 },
      { id: 2, name: "Buff Chowmein", quantity: 1, amount: 180 },
      { id: 3, name: "Coke", quantity: 2, amount: 120 },
    ],
  },
  {
    type: "BOT",
    reference: "INV-002",
    name: "Shyam Thapa",
    number: "9800000002",
    waiter: "02",
    table: "2",
    time: "11:15 AM",
    itemCount: 2,
    invoiceItems: [
      { id: 1, name: "Beer", quantity: 2, amount: 600 },
      { id: 2, name: "Whiskey", quantity: 1, amount: 450 },
    ],
  },
  {
    type: "Reservation",
    reference: "INV-003",
    name: "Hari Karki",
    number: "9800000003",
    waiter: "01",
    table: "3",
    time: "12:00 PM",
    itemCount: 5,
    invoiceItems: [
      { id: 1, name: "Fried Rice", quantity: 1, amount: 220 },
      { id: 2, name: "Chicken Curry", quantity: 2, amount: 500 },
      { id: 3, name: "Naan", quantity: 4, amount: 240 },
      { id: 4, name: "Salad", quantity: 1, amount: 150 },
      { id: 5, name: "Lassi", quantity: 2, amount: 160 },
    ],
  },
  {
    type: "KOT",
    reference: "INV-004",
    name: "Sita Rai",
    number: "9800000004",
    waiter: "03",
    table: "4",
    time: "01:30 PM",
    itemCount: 4,
    invoiceItems: [
      { id: 1, name: "Pizza", quantity: 1, amount: 650 },
      { id: 2, name: "Pasta", quantity: 1, amount: 420 },
      { id: 3, name: "Sprite", quantity: 2, amount: 100 },
      { id: 4, name: "Brownie", quantity: 1, amount: 200 },
    ],
  },
];
