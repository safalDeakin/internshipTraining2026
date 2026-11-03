import type { RefundItem } from "../types/RefundTypes";

export const refundCustomers = [
  { id: "1", name: "Ram Shrestha" },
  { id: "2", name: "Sita Thapa" },
  { id: "3", name: "Hari Gurung" },
  { id: "4", name: "Rohan Shrestha" },
];

// Sample refund items
export const initialItems: RefundItem[] = [
  { id: 1, name: "Chicken Mo:Mo", quantity: 2, price: 250, amount: 500 },
  { id: 2, name: "Veg Mo:Mo", quantity: 1, price: 180, amount: 180 },
  { id: 3, name: "Coke", quantity: 2, price: 100, amount: 200 },
  { id: 4, name: "Mojito", quantity: 1, price: 250, amount: 250 },
];
