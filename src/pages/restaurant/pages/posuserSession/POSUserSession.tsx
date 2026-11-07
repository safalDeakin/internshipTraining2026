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

import ActiveSessionModal from "../../modal/pos/ActiveSessionModal";
import ClosingSessionModal from "../../modal/pos/ClosingSessionModal";

import { useAuth } from "../../../../lib/utils/secureclient/useAuth";
import { usePOSUserSession } from "./context/usePOSUserSession";

const POSUserSession = ({ onExit }: POSUserSessionProps) => {
  const [shown, setShown] = useState(false);
  const [activeTab, setActiveTab] = useState("ordering");
  const [showSessionStatus, setShowSessionStatus] = useState(false);
  const [showClosingSession, setShowClosingSession] = useState(false);

  const navigate = useNavigate();

  const { organization } = useAuth();

  const { getActiveSession, pauseSession, endSession } = usePOSUserSession();

  // Get the current active session.
  const activeSession =
    organization?.id != null ? getActiveSession(organization.id) : undefined;

  // Opening animation.
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));

    return () => cancelAnimationFrame(id);
  }, []);

  // Navigate back to the restaurant page.
  const exitToRestaurant = () => {
    onExit?.();

    if (organization?.slug) {
      navigate(`/${organization.slug}/restaurant`);
    } else {
      navigate(-1);
    }
  };

  // Back arrow: show session options.
  const handleExit = () => {
    setShowSessionStatus(true);
  };

  // Continue: close the modal and remain in POS.
  const handleContinue = () => {
    setShowSessionStatus(false);
  };

  // Pause the current session.
  const handlePauseSession = () => {
    if (!activeSession) return;

    pauseSession(activeSession.id);

    setShowSessionStatus(false);
    setShowClosingSession(false);

    // Hide POS without ending the session.
    exitToRestaurant();
  };

  // Open closing cash form.
  const handleEndSession = () => {
    setShowSessionStatus(false);
    setShowClosingSession(true);
  };

  // Cancel closing: return to the session options.
  const handleCancelClosing = () => {
    setShowClosingSession(false);
    setShowSessionStatus(true);
  };

  // Confirm closing: permanently end the session.
  const handleConfirmClosing = (data: {
    closingCash: number;
    notes: string;
  }) => {
    if (!activeSession) return;

    endSession(activeSession.id, data.closingCash, data.notes);

    setShowClosingSession(false);
    setShowSessionStatus(false);

    exitToRestaurant();
  };

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

  // Avoid rendering the shell if the active session is unavailable.
  if (!activeSession) {
    return null;
  }

  return (
    <>
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

        {/* Main Content */}
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
            <PaymentLayout
              onTrackClick={() => setActiveTab("paymentsHistory")}
            />
          )}

          {activeTab === "paymentsHistory" && (
            <PaymentHistory onBack={() => setActiveTab("payments")} />
          )}

          {activeTab === "dashboard" && <div className="p-6">Dashboard</div>}

          {activeTab === "return" && <div className="p-6">Return</div>}
        </main>
      </div>

      {/* Active Session Options */}
      {showSessionStatus && (
        <ActiveSessionModal
          staffName={activeSession.staffName}
          terminal={activeSession.terminal}
          date={activeSession.date}
          activeSessionStartTime={new Date(
            activeSession.startTime,
          ).toLocaleTimeString()}
          onClose={handleContinue}
          onContinue={handleContinue}
          onPause={handlePauseSession}
          onEndSession={handleEndSession}
        />
      )}

      {/* Closing Session Form */}
      {showClosingSession && (
        <ClosingSessionModal
          staffName={activeSession.staffName}
          terminal={activeSession.terminal}
          date={activeSession.date}
          onCancel={handleCancelClosing}
          onConfirm={handleConfirmClosing}
        />
      )}
    </>
  );
};

export default POSUserSession;
