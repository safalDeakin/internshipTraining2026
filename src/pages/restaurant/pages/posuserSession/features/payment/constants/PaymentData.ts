import type { PaymentCard } from "../types/PaymentTypes";

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
