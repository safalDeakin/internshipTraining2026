// author: shrajja

import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Play, X } from "lucide-react";

import RestaurantNav from "./RestaurantNavbar";
import ResponsiveLayout from "../../lib/component/ResponsiveLayout";

import { useAuth } from "../../lib/utils/secureclient/useAuth";
import type { POSSessionMode } from "../../shell/types/posSessionTypes";

import ShellSetting from "./modal/settings/ShellSetting";
import ClosingSessionModal from "../../shell/modal/ClosingSessionModal";

import POSUserSession from "../../shell/POSUserSession";
import ReusableButton from "../../shell/shared/components/ReusableButton";

import DialogProvider from "../../lib/component/DialogueBox/DialogProvider";
import DrawerProvider from "../../lib/component/Drawer/DrawerProvider";
import useDrawer from "../../lib/component/Drawer/useDrawer";

import { usePOSUserSession } from "../../shell/hooks/usePOSUserSession";
import { SessionProvider } from "../../shell/context/SessionProvider";
import ShellSettings from "./dropdown/shell/ShellSettings";

// Coordinates session operations and drawer rendering.
const RestaurantLayoutContent = () => {
  const [isPausedPromptOpen, setIsPausedPromptOpen] = useState(false);
  const [isClosingFormOpen, setIsClosingFormOpen] = useState(false);
  const [activeSetting, setActiveSetting] = useState<string | null>(null);

  const { organization, user } = useAuth();
  const { openDrawer, closeDrawer } = useDrawer();

  const {
    addSession,
    getActiveSession,
    getPausedSession,
    resumeSession,
    endSession,
  } = usePOSUserSession();

  const location = useLocation();
  const organizationId = organization?.id;

  // Get current organization's active session.
  const activeSession =
    organizationId != null ? getActiveSession(organizationId) : undefined;

  // Get current organization's paused session.
  const pausedSession =
    organizationId != null ? getPausedSession(organizationId) : undefined;

  // Close prompts when route changes.
  useEffect(() => {
    setIsPausedPromptOpen(false);
    setIsClosingFormOpen(false);
  }, [location.pathname]);

  // CREATE A NEW SESSION
  const handleSelectMode = (
    mode: POSSessionMode,
    data: { openingCash: number; notes: string },
  ) => {
    if (!user || organizationId == null) return;

    const existingActive = getActiveSession(organizationId);
    const existingPaused = getPausedSession(organizationId);

    // Prevent another unfinished session.
    if (existingActive || existingPaused) return;

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
  };

  // OPEN POS SESSION DRAWER
  const openPOSDrawer = () => {
    openDrawer({
      title: "POS Session",
      showHeader: false,
      width: "100%",
      closeOnBackdrop: false,
      closeOnEscape: false,
      content: (
        <POSUserSession
          onExit={closeDrawer}
          onStartSession={(mode, data) => {
            handleSelectMode(mode, data);
          }}
          onCancelStart={closeDrawer}
        />
      ),
    });
  };

  // PLAY BUTTON
  const handlePlay = () => {
    if (activeSession) {
      openPOSDrawer();
      return;
    }

    if (pausedSession) {
      setIsPausedPromptOpen(true);
      return;
    }

    openPOSDrawer();
  };

  // CONTINUE PAUSED SESSION
  const handleContinueSession = () => {
    if (!pausedSession) return;

    resumeSession(pausedSession.id);

    setIsPausedPromptOpen(false);
    setIsClosingFormOpen(false);

    openPOSDrawer();
  };

  // OPEN CLOSING FORM
  const handleOpenClosingForm = () => {
    setIsPausedPromptOpen(false);
    setIsClosingFormOpen(true);
  };

  // CANCEL CLOSING FORM
  const handleCancelClosing = () => {
    setIsClosingFormOpen(false);
    setIsPausedPromptOpen(true);
  };

  // END PAUSED SESSION
  const handleConfirmEndSession = (data: {
    closingCash: number;
    notes: string;
  }) => {
    if (!pausedSession) return;

    endSession(pausedSession.id, data.closingCash, data.notes);

    setIsClosingFormOpen(false);
    setIsPausedPromptOpen(false);
  };

  // OPEN SHELL SETTINGS DRAWER
  const handleOpenShellSettings = () => {
    openDrawer({
      title: "Shell Settings",
      width: "1100px",
      closeOnBackdrop: true,
      closeOnEscape: true,
      content: <ShellSettings />,
    });
  };

  // HANDLE NAVBAR SETTINGS
  const handleOpenSetting = (setting: string) => {
    if (setting === "shell-settings") {
      handleOpenShellSettings();
      return;
    }

    setActiveSetting(setting);
  };

  return (
    <>
      <ResponsiveLayout
        sidebar={(closeBar) => (
          <RestaurantNav
            closeBar={closeBar}
            openSessionMode={handlePlay}
            onOpenSetting={handleOpenSetting}
          />
        )}
      >
        <Outlet context={{ openSessionMode: handlePlay }} />
      </ResponsiveLayout>

      {/* OTHER SETTINGS */}
      {activeSetting === "sales" && (
        <ShellSetting onClose={() => setActiveSetting(null)} />
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

      {/* CLOSING FORM */}
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

const RestaurantLayout = () => (
  <SessionProvider>
    <DialogProvider>
      <DrawerProvider>
        <RestaurantLayoutContent />
      </DrawerProvider>
    </DialogProvider>
  </SessionProvider>
);

export default RestaurantLayout;
