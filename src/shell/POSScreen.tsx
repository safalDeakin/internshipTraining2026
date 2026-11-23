// author: shrajja
import { ArrowLeft } from "lucide-react";
import OrderingLayout from "./features/layout/OrderingLayout";
import type { POSSessionMode } from "./types/posSessionTypes";
import { tabs } from "./constants/posSessionAlldata";
import OrderHistory from "./features/historypages/OrderHistory";
import InvoicingLayout from "./features/layout/InvoicingLayout";
import InvoiceHistory from "./features/historypages/InvoiceHistory";
import PaymentLayout from "./features/layout/PaymentLayout";
import PaymentHistory from "./features/historypages/PaymentHistory";
import { useUserSession } from "./context/UserSessionProvider";
import { useState } from "react";


export interface POSScreenProps {
  onExit: () => void;

  sessionMode?: POSSessionMode;
}
const POSScreen = ({ onExit }: POSScreenProps) => {
  const [activeTab, setActiveTab] = useState("ordering");
  const { session } = useUserSession();
  console.log('rendering POSScreen');

  // Handle active navigation tabs.
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

    return activeTab === id;
  };

  return (
    <>
      <div
      // className={`relative flex h-full min-h-0 w-full flex-col overflow-hidden ${
      //   shown ? "opacity-100" : "opacity-0"
      // } transition-opacity duration-300`}
      >
        {/* POS NAVIGATION - ALWAYS RENDERED */}
        <nav className="flex shrink-0 items-center gap-2 bg-gray-100 px-4 py-3">
          <button
            type="button"
            onClick={onExit}
            className="rounded-lg p-2 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="View active session options"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex flex-1 items-center justify-around overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon }) => {
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

        {/* POS MAIN CONTENT - ALWAYS RENDERED */}
        <main className="min-h-0 flex-1 overflow-y-auto">
          {activeTab === "ordering" && (
            <OrderingLayout onTrackClick={() => setActiveTab("orderHistory")} />
          )}

          {activeTab === "orderHistory" && (
            <OrderHistory onBack={() => setActiveTab("ordering")} />
          )}

          {activeTab === "invoicing" && (
            <InvoicingLayout
              onTrackClick={() => setActiveTab("invoiceHistory")}
            />
          )}

          {activeTab === "invoiceHistory" && (
            <InvoiceHistory onBack={() => setActiveTab("invoicing")} />
          )}

          {activeTab === "payments" && (
            <PaymentLayout onTrackClick={() => setActiveTab("paymentsHistory")} />
          )}

          {activeTab === "paymentsHistory" && (
            <PaymentHistory onBack={() => setActiveTab("payments")} />
          )}

          {activeTab === "dashboard" && <div className="p-6">Dashboard</div>}

          {activeTab === "return" && <div className="p-6">Return</div>}
        </main>

      </div>

    </>
  );
};

export default POSScreen;
