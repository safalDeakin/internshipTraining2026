import { ArrowLeft, ClipboardList, Radio, Receipt, Undo2, Wallet } from "lucide-react";
import OrderingLayout from "./features/layout/OrderingLayout";
import OrderHistory from "./features/historypages/OrderHistory";
import InvoicingLayout from "./features/layout/InvoicingLayout";
import InvoiceHistory from "./features/historypages/InvoiceHistory";
import PaymentLayout from "./features/layout/PaymentLayout";
import PaymentHistory from "./features/historypages/PaymentHistory";
import { useUserSession } from "./context/UserSessionProvider";
import { useState } from "react";
import { OrderingProvider } from "./context/OrderingProvider";
import { BillingProvider } from "./context/BillingProvider";
import ApprovalsLayout from "./features/layout/ApprovalsLayout";
import ApprovalHistory from "./features/historypages/ApprovalHistory";

export interface POSScreenProps {
  onExit: () => void;
}

const POSScreen = ({ onExit }: POSScreenProps) => {
  const [activeTab, setActiveTab] = useState("ordering");
  const { session } = useUserSession();

  const isTabActive = (id: string) => {
    if (id === "ordering") {
      return activeTab === "ordering" || activeTab === "orderHistory";
    }

    if (id === "invoicing") {
      return activeTab === "invoicing" || activeTab === "invoiceHistory";
    }

    if (id === "payments") {
      return activeTab === "payments" || activeTab === "paymentsHistory";
    }
    if (id === "approval") {
      return activeTab === "approval" || activeTab === "approvalHistory";
    }


    return activeTab === id;
  };

  const getNavConfig = () => {
    let config;

    switch (session?.mode) {
      case 'Standard':
        config = [
          { id: "liveOrder", label: "Live Order", icon: Radio },
          { id: "ordering", label: "Ordering", icon: ClipboardList },
          { id: "itemStatus", label: "Item Status", icon: Undo2 }
        ];
        break;

      case 'Session':
        config = [
          { id: "liveOrder", label: "Live Order", icon: Radio },
          { id: "invoicing", label: "Invoicing", icon: Receipt },
          { id: "payments", label: "Payments", icon: Wallet },
          { id: "ordering", label: "Ordering", icon: ClipboardList },
          { id: "itemStatus", label: "Item Status", icon: Undo2 }
        ];
        break;

      case 'Manager':
        config = [
          { id: "liveOrder", label: "Live Order", icon: Radio },
          { id: "invoicing", label: "Invoicing", icon: Receipt },
          { id: "payments", label: "Payments", icon: Wallet },
          { id: "ordering", label: "Ordering", icon: ClipboardList },
          { id: "approval", label: "Approval", icon: ClipboardList },
          { id: "itemStatus", label: "Item Status", icon: Undo2 }
        ];
        break;

      case 'Service':
        config = [
          { id: "liveOrder", label: "Live Order", icon: Radio },
          { id: "invoicing", label: "Invoicing", icon: Receipt },
          { id: "payments", label: "Payments", icon: Wallet },
          { id: "ordering", label: "Ordering", icon: ClipboardList },
          { id: "approval", label: "Approval", icon: ClipboardList },
          { id: "itemStatus", label: "Item Status", icon: Undo2 }
        ];
        break;

      default:
        config = [
          { id: "liveOrder", label: "Live Order", icon: Radio },
          { id: "ordering", label: "Ordering", icon: ClipboardList },
          { id: "itemStatus", label: "Item Status", icon: Undo2 }
        ];
        break;

    }
    return config;
  }
  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      {/* POS NAVIGATION */}
      <nav className="flex shrink-0 items-center gap-2 bg-gray-100 px-4 py-3">
        <button
          type="button"
          onClick={onExit}
          className="rounded-lg p-2 hover:bg-gray-200"
          aria-label="View active session options"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex flex-1 items-center justify-around overflow-x-auto">
          {getNavConfig().map(({ id, label, icon: Icon }) => {
            const isActive = isTabActive(id);

            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                disabled={!session}
                className={`flex min-w-24 flex-col items-center gap-1 px-4 py-1 text-sm ${isActive
                  ? "text-blue-500 underline underline-offset-4"
                  : "text-gray-800 hover:text-blue-500"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <Icon className="h-6 w-6" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* POS CONTENT */}
      <main className="min-h-0 flex-1 overflow-y-auto">
        <OrderingProvider>
          {activeTab === "ordering" && (
            <OrderingLayout
              onTrackClick={() => setActiveTab("orderHistory")}
            />
          )}
          {activeTab === "orderHistory" && (
            <OrderHistory onBack={() => setActiveTab("ordering")} />
          )}
        </OrderingProvider>

        <BillingProvider>
          {activeTab === "invoicing" && (
            <InvoicingLayout
              onTrackClick={() => setActiveTab("invoiceHistory")}
            />
          )}

          {activeTab === "invoiceHistory" && (
            <InvoiceHistory onBack={() => setActiveTab("invoicing")} />
          )}
        </BillingProvider>

        {activeTab === "payments" && (
          <PaymentLayout
            onTrackClick={() => setActiveTab("paymentsHistory")}
          />
        )}
        {activeTab === "paymentsHistory" && (
          <PaymentHistory onBack={() => setActiveTab("payments")} />
        )}

        {activeTab === "approval" && (
          <ApprovalsLayout
            onTrackClick={() => setActiveTab("approvalHistory")}
          />
        )}
        {activeTab === "approvalHistory" && (
          <ApprovalHistory onBack={() => setActiveTab("approval")} />
        )}



      </main>
    </div>
  );
};

export default POSScreen;
