import type { FoodItem, HistoryItem, Order } from "../types/OrderingTypes";

// ///for filter at top of page
export const ORDER_FILTERS = ["All", "Food", "Drinks", "Extras"];

//2: Mock data for ordering frot page (food repository)
export const foodItems: FoodItem[] = [
  {
    id: 1,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
    status: "N/A",
    type: "food",
  },

  { id: 3, label: "Mojito", date: "2083/01/22", type: "beverage" },

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
    id: 14,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "food",
  },
];
//2nd for order repository
export const initialOrderData: Order[] = [
  {
    id: "ORD-001",
    orderNo: "ORD-001",
    customerName: "Ram Sharma",
    phone: "9800000000",
    referenceNumber: "REF-001",
    location: "Table 1",
    waiter: "Sita",
    table: "T1",

    items: [
      {
        id: 1,
        label: "Chicken Mo:Mo",
        date: "2026-11-25",
        qty: 7,
        type: "food",
      },
    ],

    status: "Pending",
    createdAt: new Date().toISOString(),
  },
];
