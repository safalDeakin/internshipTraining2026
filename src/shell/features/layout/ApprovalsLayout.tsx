import { useState } from "react";

import type { ApprovalCard } from "../types/ApprovalTypes";

import TwoPanelLayout from "../../shared/components/TwoPanelLayout";
import PaymentToolbar from "../cards/PaymentToolbar";
import ApprovalCards from "../cards/ApprovalCard";
import ApprovalForm from "../forms/ApprovalForm";

import { ApprovalProvider, useApproval } from "../../context/ApprovalProvider";
import useDialogBox from "../../../lib/component/DialogueBox/useDialogueBox";
import DeleteConfirmationModal from "../../../pages/restaurant/modal/DeleteConfirmationModal";

export interface ApprovalLayoutProps {
  onTrackClick: () => void;
}

const ApprovalContent = ({ onTrackClick }: ApprovalLayoutProps) => {
  const { approvals } = useApproval();

  const [selectedItem, setSelectedItem] = useState<ApprovalCard | null>(null);

  const { showDialog, closeDialog } = useDialogBox();

  const handleAccept = (remark: string) => {
    console.log("Approval accepted:", selectedItem?.id, remark);
  };

  const handleDecline = (remark: string) => {
    if (!selectedItem) return;

    showDialog({
      title: "Decline Approval",
      width: 450,
      showHeader: false,
      closeOnBackdrop: false,
      content: (
        <DeleteConfirmationModal
          title="Decline Approval"
          message="Are you sure you want to decline this approval request?"
          itemName={`${selectedItem.requestType} - ${selectedItem.requestNo}`}
          onCancel={() => closeDialog()}
          onConfirm={() => {
            console.log("Approval declined:", selectedItem.id, remark);
            closeDialog();
            setSelectedItem(null);
          }}
        />
      ),
    });
  };

  const handleSelectApproval = (item: ApprovalCard) => {
    setSelectedItem(item);
  };

  const gridClasses = selectedItem
    ? "grid grid-cols-2 gap-3 py-3 md:grid-cols-3 2xl:grid-cols-4"
    : "grid grid-cols-2 gap-3 py-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

  return (
    <TwoPanelLayout
      panelWidth="400px"
      header={<PaymentToolbar onHistoryClick={onTrackClick} />}
      panel={
        selectedItem ? (
          <ApprovalForm
            key={selectedItem.id}
            approval={selectedItem}
            onAccept={handleAccept}
            onDecline={handleDecline}
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
          {approvals.map((item) => (
            <ApprovalCards
              key={item.id}
              approval={item}
              isSelected={selectedItem?.id === item.id}
              onClick={() => handleSelectApproval(item)}
            />
          ))}
        </div>
      </div>
    </TwoPanelLayout>
  );
};

const ApprovalsLayout = ({ onTrackClick }: ApprovalLayoutProps) => {
  return (
    <ApprovalProvider>
      <ApprovalContent onTrackClick={onTrackClick} />
    </ApprovalProvider>
  );
};

export default ApprovalsLayout;
