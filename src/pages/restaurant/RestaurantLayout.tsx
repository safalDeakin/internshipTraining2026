// author: shrajja

import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Play, X } from "lucide-react";

import RestaurantNav from "./RestaurantNavbar";
import ResponsiveLayout from "../../lib/component/ResponsiveLayout";

import { useAuth } from "../../lib/utils/secureclient/useAuth";
import type { POSSessionMode } from "./pages/posuserSession/types/posSessionTypes";

import ShellSetting from "./modal/settings/ShellSetting";
import InactiveSessionModal from "./modal/pos/InactiveSessionModal";
import ClosingSessionModal from "./modal/pos/ClosingSessionModal";

import POSUserSession from "./pages/posuserSession/POSUserSession";
import { usePOSUserSession } from "./pages/posuserSession/context/usePOSUserSession";
import ReusableButton from "./pages/posuserSession/shared/components/reuse/ReusableButton";

const RestaurantLayout = () => {
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [isPausedPromptOpen, setIsPausedPromptOpen] = useState(false);
  const [isClosingFormOpen, setIsClosingFormOpen] = useState(false);

  const [activeSetting, setActiveSetting] = useState<string | null>(null);

  const { organization, user } = useAuth();

  const {
    addSession,
    getActiveSession,
    getPausedSession,
    resumeSession,
    endSession,
  } = usePOSUserSession();

  const location = useLocation();
  const organizationId = organization?.id;

  // Get the current active session.
  const activeSession =
    organizationId != null ? getActiveSession(organizationId) : undefined;

  // Get the current paused session.
  const pausedSession =
    organizationId != null ? getPausedSession(organizationId) : undefined;

  // Close overlays when navigating to another route.
  useEffect(() => {
    setIsSessionOpen(false);
    setIsModeOpen(false);
    setIsPausedPromptOpen(false);
    setIsClosingFormOpen(false);
  }, [location.pathname]);

  // PLAY BUTTON
  const handlePlay = () => {
    // If a session is already active, reopen it.
    if (activeSession) {
      setIsSessionOpen(true);
      return;
    }

    // If a session is paused, ask whether to continue or end it.
    if (pausedSession) {
      setIsPausedPromptOpen(true);
      return;
    }

    // Otherwise, start a new session.
    setIsModeOpen(true);
  };

  // CREATE A NEW SESSION
  const handleSelectMode = (
    mode: POSSessionMode,
    data: { openingCash: number; notes: string },
  ) => {
    if (!user || organizationId == null) return;

    // Prevent creating another unfinished session.
    const existingActive = getActiveSession(organizationId);
    const existingPaused = getPausedSession(organizationId);

    if (existingActive) {
      setIsModeOpen(false);
      setIsSessionOpen(true);
      return;
    }

    if (existingPaused) {
      setIsModeOpen(false);
      setIsPausedPromptOpen(true);
      return;
    }

    const now = new Date();

    addSession({
      id: crypto.randomUUID(),
      staffId: String(user.id),
      staffName: user.name,
      terminal: "Main Counter",
      date: now.toISOString().slice(0, 10),
      mode,
      organizationId,
      startTime: now.toISOString(),
      endTime: null,
      pausedAt: null,
      totalPausedDurationMs: 0,
      status: "active",
      isApproved: false,
      isVerified: false,
      openingCash: data.openingCash,
      openingNotes: data.notes,
    });

    setIsModeOpen(false);
    setIsSessionOpen(true);
  };

  // CONTINUE A PAUSED SESSION
  const handleContinueSession = () => {
    if (!pausedSession) return;

    resumeSession(pausedSession.id);

    setIsPausedPromptOpen(false);
    setIsClosingFormOpen(false);
    setIsSessionOpen(true);
  };

  // OPEN THE EXISTING CLOSING SESSION MODAL
  const handleOpenClosingForm = () => {
    setIsPausedPromptOpen(false);
    setIsClosingFormOpen(true);
  };

  // CANCEL CLOSING AND RETURN TO PAUSED SESSION PROMPT
  const handleCancelClosing = () => {
    setIsClosingFormOpen(false);
    setIsPausedPromptOpen(true);
  };

  // CONFIRM END OF PAUSED SESSION
  const handleConfirmEndSession = (data: {
    closingCash: number;
    notes: string;
  }) => {
    if (!pausedSession) return;

    endSession(pausedSession.id, data.closingCash, data.notes);

    setIsClosingFormOpen(false);
    setIsPausedPromptOpen(false);
    setIsSessionOpen(false);
  };

  // CANCEL INITIAL SESSION CREATION
  const handleCancelMode = () => {
    setIsModeOpen(false);
  };

  // HIDE POS SHELL WITHOUT ENDING THE SESSION.
  const handleExitPOS = () => {
    setIsSessionOpen(false);
  };

  return (
    <>
      <ResponsiveLayout
        sidebar={(closeBar) => (
          <RestaurantNav
            closeBar={closeBar}
            openSessionMode={handlePlay}
            onOpenSetting={setActiveSetting}
          />
        )}
      >
        <Outlet />
      </ResponsiveLayout>

      {/* SETTINGS */}
      {activeSetting === "sales" && (
        <ShellSetting onClose={() => setActiveSetting(null)} />
      )}

      {/* POS SHELL */}
      {isSessionOpen && activeSession && (
        <POSUserSession
          onExit={handleExitPOS}
          sessionMode={activeSession.mode}
        />
      )}

      {/* START NEW SESSION */}
      {isModeOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-13 z-[10000] flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
          onClick={handleCancelMode}
        >
          <div onClick={(event) => event.stopPropagation()}>
            <InactiveSessionModal
              onClose={handleCancelMode}
              onSelect={handleSelectMode}
              staffName={user?.name ?? "Unknown"}
              terminal="Main Counter"
              date={new Date().toLocaleDateString()}
            />
          </div>
        </div>
      )}

      {/* PAUSED SESSION PROMPT */}
      {isPausedPromptOpen && pausedSession && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Paused POS Session
              </h2>

              <button
                type="button"
                onClick={() => setIsPausedPromptOpen(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-2 text-sm text-gray-600">
              You have an unfinished POS session.
            </p>

            <div className="mb-6 rounded-lg bg-gray-50 p-4 text-sm">
              <p>
                <span className="font-medium">Staff:</span>{" "}
                {pausedSession.staffName}
              </p>

              <p className="mt-1">
                <span className="font-medium">Terminal:</span>{" "}
                {pausedSession.terminal}
              </p>

              <p className="mt-1">
                <span className="font-medium">Mode:</span> {pausedSession.mode}
              </p>

              <p className="mt-1">
                <span className="font-medium">Opening cash:</span> Rs.{" "}
                {pausedSession.openingCash}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <ReusableButton
                variant="primary"
                size="lg"
                onClick={handleContinueSession}
                className="w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  <Play size={17} />
                  Continue Previous Session
                </span>
              </ReusableButton>

              <ReusableButton
                variant="danger"
                size="lg"
                onClick={handleOpenClosingForm}
                className="w-full"
              >
                End Previous Session
              </ReusableButton>
            </div>
          </div>
        </div>
      )}

      {/* REUSABLE CLOSING SESSION MODAL */}
      {isClosingFormOpen && pausedSession && (
        <ClosingSessionModal
          staffName={pausedSession.staffName}
          terminal={pausedSession.terminal}
          date={new Date(pausedSession.date).toLocaleDateString()}
          onCancel={handleCancelClosing}
          onConfirm={handleConfirmEndSession}
        />
      )}
    </>
  );
};

export default RestaurantLayout;
