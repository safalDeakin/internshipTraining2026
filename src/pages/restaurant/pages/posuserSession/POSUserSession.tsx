// author: shrajja
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OrderingLayout from "./features/ordering/OrderingLayout";
import PaymentLayout from "./features/payment/PaymentLayout";
import InvoicingLayout from "./features/invoicing/InvoicingLayout";
import OrderHistory from "./features/ordering/OrderHistory";
import PaymentHistory from "./features/payment/PaymentHistory";
import InvoiceHistory from "./features/invoicing/InvoiceHistory";
import type { POSUserSessionProps } from "./types/posSessionTypes";
import { tabs } from "./constants/posSessionAlldata";

const POSUserSession = ({ onExit }: POSUserSessionProps) => {
  const [shown, setShown] = useState(false);
  const [activeTab, setActiveTab] = useState("ordering");
  const navigate = useNavigate();

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      navigate(-1);
    }
  };

  // Keep the parent navigation tab highlighted while viewing its history.
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
    <div
      className={`fixed inset-x-0 bottom-0 top-13 z-[9000] flex flex-col bg-white transition-transform duration-300 ease-out ${
        shown ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Navigation */}
      <nav className="flex items-center gap-2 bg-gray-100 px-4 py-3">
        <button
          type="button"
          onClick={handleExit}
          className="rounded-lg p-2 hover:bg-gray-200"
          aria-label="Exit session"
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
                className={`flex min-w-24 flex-col items-center gap-1 px-4 py-1 text-sm ${
                  isActive
                    ? "text-blue-500 underline underline-offset-4"
                    : "text-gray-800 hover:text-blue-500"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main content */}
      <main className="min-h-0 flex-1 overflow-y-auto">
        {/* Ordering */}
        {activeTab === "ordering" && (
          <OrderingLayout onTrackClick={() => setActiveTab("orderHistory")} />
        )}

        {activeTab === "orderHistory" && (
          <OrderHistory onBack={() => setActiveTab("ordering")} />
        )}

        {/* Invoicing */}
        {activeTab === "invoicing" && (
          <InvoicingLayout
            onTrackClick={() => setActiveTab("invoicingHistory")}
          />
        )}

        {activeTab === "invoiceHistory" && (
          <InvoiceHistory onBack={() => setActiveTab("invoicing")} />
        )}

        {/* Payments */}
        {activeTab === "payments" && (
          <PaymentLayout onTrackClick={() => setActiveTab("paymentsHistory")} />
        )}

        {activeTab === "paymentsHistory" && (
          <PaymentHistory onBack={() => setActiveTab("payments")} />
        )}

        {/* Other tabs */}
        {activeTab === "dashboard" && <div className="p-6">Dashboard</div>}

        {activeTab === "reservation" && <div className="p-6">Reservation</div>}

        {activeTab === "return" && <div className="p-6">Return</div>}

        {activeTab === "stock" && <div className="p-6">Stock</div>}
      </main>
    </div>
  );
};

export default POSUserSession;
