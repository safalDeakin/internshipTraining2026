import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import RestaurantNav from "./RestaurantNavbar";
import ResponsiveLayout from "../../component/ResponsiveLayout";
import SessionModeModal from "./popup/SessionModeModal";
import POSUserSession from "./pages/posuserSession/POSUserSession";
import { useAuth } from "../../utils/secureclient/useAuth";
import { getOrganizationPath } from "../../utils/secureclient/services/models/orgPath";
import type { POSSessionMode } from "../../types/POSUserSession";
import { usePOSUserSession } from "../../hooks/usePOSUserSession";

const RestaurantLayout = () => {
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [isModeOpen, setIsModeOpen] = useState(false);

  const navigate = useNavigate();
  const { organization } = useAuth();
  const { sessions, addSession, updateSession } = usePOSUserSession();

  // Replace these property names with those from your actual AuthContext.
  const { user } = useAuth();

  const organizationId = organization?.id;

  // Only use sessions for the currently selected organization.
  const activeSession = sessions.find(
    (session) =>
      session.endTime === null && session.organizationId === organizationId,
  );

  const isSessionActive = Boolean(activeSession);

  const handlePlay = () => {
    if (!isSessionActive) {
      setIsSessionOpen(true);
    }

    setIsModeOpen(true);
  };

  const handleSelectMode = (mode: POSSessionMode) => {
    if (!user || organizationId == null) return;

    const now = new Date();

    addSession({
      id: Date.now(),
      staffId: user.id,
      staffName: user.name,
      terminal: "Main Counter",
      date: now.toISOString().slice(0, 10),
      mode,
      organizationId,
      startTime: now.toISOString(),
      endTime: null,
      isApproved: false,
      isVerified: false,
    });

    // Close only the modal.
    setIsModeOpen(false);
    setIsSessionOpen(false);

    // Do not navigate here.
    // The page should already be open from the Play click.
  };

  const handleEndSession = () => {
    if (!activeSession) return;

    updateSession(activeSession.id, {
      endTime: new Date().toISOString(),
    });

    setIsModeOpen(false);
    setIsSessionOpen(false);
  };

  const handlePauseSession = () => {
    if (!activeSession) return;

    updateSession(activeSession.id, {
      isPaused: true,
    });

    setIsModeOpen(false);
  };
  const handleCancelMode = () => {
    setIsModeOpen(false);
    setIsSessionOpen(false);
  };

  return (
    <>
      <ResponsiveLayout
        sidebar={(closeBar) => (
          <RestaurantNav closeBar={closeBar} openSessionMode={handlePlay} />
        )}
      >
        <Outlet />
      </ResponsiveLayout>

      {isSessionOpen && (
        <POSUserSession onExit={() => setIsSessionOpen(false)} />
      )}

      {isModeOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-13 z-[10000] flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
          onClick={handleCancelMode}
        >
          <div onClick={(event) => event.stopPropagation()}>
            <SessionModeModal
              onClose={handleCancelMode}
              onSelect={handleSelectMode}
              onEndSession={handleEndSession}
              onPause={handlePauseSession}
              isSessionActive={isSessionActive}
              staffName={activeSession?.staffName ?? user?.name ?? "Unknown"}
              terminal={activeSession?.terminal ?? "Main Counter"}
              date={activeSession?.date ?? new Date().toLocaleDateString()}
              activeSessionStartTime={
                activeSession
                  ? new Date(activeSession.startTime).toLocaleTimeString()
                  : undefined
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantLayout;
