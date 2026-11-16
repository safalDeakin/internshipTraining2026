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

import type {
  POSUserSessionProps,
  POSSessionMode,
} from "./types/posSessionTypes";

import { tabs } from "./constants/posSessionAlldata";

import ActiveSessionModal from "../../modal/pos/ActiveSessionModal";
import ClosingSessionModal from "../../modal/pos/ClosingSessionModal";
import InactiveSessionModal from "../../modal/pos/InactiveSessionModal";

import { useAuth } from "../../../../lib/utils/secureclient/useAuth";
import { usePOSUserSession } from "./context/usePOSUserSession";
import useDialogBox from "../../../../lib/component/DialogueBox/useDialogueBox";

const POSUserSession = ({
  onExit,
  onStartSession,
  onCancelStart,
}: POSUserSessionProps) => {
  const [shown, setShown] = useState(false);
  const [activeTab, setActiveTab] = useState("ordering");
  // Controls when the inactive session modal appears.
  const [showInactiveModal, setShowInactiveModal] = useState(false);

  const navigate = useNavigate();
  const { organization, user } = useAuth();

  const { showDialog, closeDialog } = useDialogBox();

  const { getActiveSession, pauseSession, endSession } = usePOSUserSession();

  // Get the current active session.
  const activeSession =
    organization?.id != null ? getActiveSession(organization.id) : undefined;

  // Show inactive session modal after 3 seconds.
  useEffect(() => {
    if (activeSession) {
      setShowInactiveModal(false);
      return;
    }

    setShowInactiveModal(false);

    const timer = setTimeout(() => {
      setShowInactiveModal(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeSession]);

  // Navigate back to restaurant page.
  const exitToRestaurant = () => {
    onExit?.();

    if (organization?.slug) {
      navigate(`/${organization.slug}/restaurant`);
    } else {
      navigate(-1);
    }
  };

  // Continue: close dialog and remain in POS.
  const handleContinue = () => {
    closeDialog();
  };

  // Show active session dialog.
  const handleExit = () => {
    if (!activeSession) return;

    showDialog({
      title: "Active Session",
      showHeader: true,
      closeOnEscape: true,
      closeOnBackdrop: true,
      content: (
        <ActiveSessionModal
          staffName={activeSession.staffName}
          terminal={activeSession.terminal}
          date={activeSession.date}
          activeSessionStartTime={new Date(
            activeSession.startTime,
          ).toLocaleTimeString()}
          onContinue={handleContinue}
          onPause={handlePauseSession}
          onEndSession={handleEndSession}
        />
      ),
    });
  };

  // Pause the current session.
  const handlePauseSession = () => {
    if (!activeSession) return;

    pauseSession(activeSession.id);

    closeDialog();

    exitToRestaurant();
  };

  // Show closing session dialog.
  const handleEndSession = () => {
    if (!activeSession) return;

    closeDialog();

    showDialog({
      title: "Close POS Session",
      showHeader: true,
      closeOnEscape: true,
      closeOnBackdrop: true,
      content: (
        <ClosingSessionModal
          staffName={activeSession.staffName}
          terminal={activeSession.terminal}
          date={activeSession.date}
          onCancel={handleCancelClosing}
          onConfirm={handleConfirmClosing}
        />
      ),
    });
  };

  // Cancel closing: return to active session dialog.
  const handleCancelClosing = () => {
    closeDialog();
    handleExit();
  };

  // Confirm closing session.
  const handleConfirmClosing = (data: {
    closingCash: number;
    notes: string;
  }) => {
    if (!activeSession) return;

    endSession(activeSession.id, data.closingCash, data.notes);

    closeDialog();

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

  return (
    <div
    // className={`relative flex h-full min-h-0 w-full flex-col overflow-hidden ${
    //   shown ? "opacity-100" : "opacity-0"
    // } transition-opacity duration-300`}
    >
      {/* POS NAVIGATION - ALWAYS RENDERED */}
      <nav className="flex shrink-0 items-center gap-2 bg-gray-100 px-4 py-3">
        <button
          type="button"
          onClick={handleExit}
          disabled={!activeSession}
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
                disabled={!activeSession}
                className={`flex min-w-24 flex-col items-center gap-1 px-4 py-1 text-sm ${
                  isActive
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

      {/* INACTIVE SESSION MODAL - OVERLAY ABOVE POS */}
      {!activeSession && showInactiveModal && (
        <div className="absolute inset-0 z-30 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg">
            <InactiveSessionModal
              staffName={user?.name ?? "Unknown"}
              terminal="Main Counter"
              date={new Date().toLocaleDateString()}
              onClose={() => onCancelStart?.()}
              onSelect={(mode, data) => {
                onStartSession?.(mode, data);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default POSUserSession;
