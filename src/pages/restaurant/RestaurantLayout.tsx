// author: shrajja

import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";


import RestaurantNav from "./RestaurantNavbar";
import ResponsiveLayout from "../../lib/component/ResponsiveLayout";

import { useAuth } from "../../lib/utils/secureclient/useAuth";
import type { POSSessionMode } from "../../shell/types/posSessionTypes";

import ShellSetting from "./modal/settings/ShellSetting";
import ClosingSessionModal from "../../shell/modal/ClosingSessionModal";

import POSUserSession from "../../shell/POSUserSession";

import DialogProvider from "../../lib/component/DialogueBox/DialogProvider";
import DrawerProvider from "../../lib/component/Drawer/DrawerProvider";
import useDrawer from "../../lib/component/Drawer/useDrawer";

import { usePOSUserSession } from "../../shell/hooks/usePOSUserSession";
import { SessionProvider } from "../../shell/context/SessionProvider";
import ShellSettings from "./dropdown/shell/ShellSettings";
import Frame from "../../lib/component/Frame/Frame";
import ContinueSession from "../../shell/modal/ContinueSession";

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




  // PLAY BUTTON
  const handlePlay = () => {
    if (activeSession) {
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
      return;
    }

    if (pausedSession) {
      setIsPausedPromptOpen(true);
      return;
    }
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

  // CONTINUE PAUSED SESSION
  const handleContinueSession = () => {
    if (!pausedSession) return;

    resumeSession(pausedSession.id);

    setIsPausedPromptOpen(false);
    setIsClosingFormOpen(false);

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


  // HANDLE NAVBAR SETTINGS
  const handleOpenSetting = (setting: string) => {
    if (setting === "shell-settings") {
      openDrawer({
        title: "Shell Settings",
        width: "1100px",
        closeOnBackdrop: true,
        closeOnEscape: true,
        content: <ShellSettings />,
      });
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


        <ContinueSession
          session={pausedSession}
          handleContinueSession={handleContinueSession}
          handleOpenClosingForm={handleOpenClosingForm}
          setIsPausedPromptOpen={setIsPausedPromptOpen}
        >
        </ContinueSession>

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

  <Frame>
    <SessionProvider>
      <DialogProvider>
        <DrawerProvider>
          <RestaurantLayoutContent />
        </DrawerProvider>
      </DialogProvider>
    </SessionProvider>
  </Frame>
);

export default RestaurantLayout;

