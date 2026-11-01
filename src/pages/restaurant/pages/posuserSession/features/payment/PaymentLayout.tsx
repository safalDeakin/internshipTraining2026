import { useState } from "react";
import PaymentCards from "./components/PaymentCards";
import PaymentToolbar from "./components/PaymentToolbar";
import TwoPanelLayout from "../../shared/components/TwoPanelLayout";
import PaymentForm from "./components/PaymentForm";
import { paymentCards } from "./constants/PaymentData";
import type { PaymentCard, PaymentLayoutProps } from "./types/PaymentTypes";

const PaymentLayout = ({ onTrackClick }: PaymentLayoutProps) => {
  const [selectedItem, setSelectedItem] = useState<PaymentCard | null>(null);

  const gridClasses = selectedItem
    ? "grid grid-cols-2 gap-3 py-3 md:grid-cols-3 2xl:grid-cols-4"
    : "grid grid-cols-2 gap-3 py-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

  return (
    <TwoPanelLayout
      panelWidth="400px"
      header={<PaymentToolbar onHistoryClick={onTrackClick} />}
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
