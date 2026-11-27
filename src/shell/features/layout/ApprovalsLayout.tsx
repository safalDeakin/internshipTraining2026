import { useState } from "react";
import type { ApprovalCard } from "../types/ApprovalTypes";
import TwoPanelLayout from "../../shared/components/TwoPanelLayout";
import PaymentToolbar from "../cards/PaymentToolbar";
import PaymentForm from "../forms/PaymentForm";
import { approvalCards } from "../data/ApprovalData";
import ApprovalCards from "../cards/ApprovalCard";

export interface ApprovalLayoutProps {
  onTrackClick: () => void;
}

const ApprovalsLayout = ({ onTrackClick }: ApprovalLayoutProps) => {
  const [selectedItem, setSelectedItem] = useState<ApprovalCard | null>(null);

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
          {approvalCards.map((item) => (
            <ApprovalCards
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

export default ApprovalsLayout;
