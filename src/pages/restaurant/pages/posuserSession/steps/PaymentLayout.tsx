import { useState } from "react";
import TwoPanelLayout from "../components/TwoPanelLayout";
import PaymentForm from "../components/payment/PaymentForm";
import PaymentCards from "../components/payment/PaymentCards";

export interface Cards {
  id?: number;
  image?: string;
  name?: string;
  email?: string;
  number?: string;
  payment?: string;
  invoice?: string[];
}

export const paymentCards: Cards[] = [
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

const PaymentLayout = () => {
  const [selectedItem, setSelectedItem] = useState<Cards | null>(null);

  const gridClasses = selectedItem
    ? "grid grid-cols-2 gap-3 py-3 md:grid-cols-3 2xl:grid-cols-4"
    : "grid grid-cols-2 gap-3 py-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

  return (
    <TwoPanelLayout
      gap="20px"
      className="px-6"
      panelWidth="400px"
      panel={
        selectedItem ? (
          <PaymentForm
            customer={selectedItem}
            onCancel={() => setSelectedItem(null)}
          />
        ) : null
      }
    >
      <div
        className={
          selectedItem
            ? "lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-1"
            : ""
        }
      >
        <div className={gridClasses}>
          {paymentCards.map((item) => (
            <PaymentCards
              key={item.id}
              {...item}
              isSelected={selectedItem?.id === item.id}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>
    </TwoPanelLayout>
  );
};

export default PaymentLayout;
