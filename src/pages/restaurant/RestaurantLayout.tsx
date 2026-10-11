//author:shrajja
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Outlet, useNavigate } from "react-router-dom";
import RestaurantNav from "./RestaurantNavbar";
import ResponsiveLayout from "../../component/ResponsiveLayout";
import SessionModeModal from "./popup/SessionModeModal";
import POSUserSession from "./pages/POSUserSession";
import { useAuth } from "../../utils/secureclient/useAuth";
import { getOrganizationPath } from "../../utils/secureclient/services/models/orgPath";

const RestaurantLayout = () => {
  const [isSessionOpen, setIsSessionOpen] = useState(false); // slide-in page
  const [isModeOpen, setIsModeOpen] = useState(false); // mode modal
  const navigate = useNavigate();
  const { organization } = useAuth();
  const handlePlay = () => {
    setIsSessionOpen(true);
    setIsModeOpen(true);
  };

  const handleSelectMode = () => {
    setIsModeOpen(false);
    setIsSessionOpen(false);
    navigate(getOrganizationPath("/restaurant/session", organization));
  };
  // cancel: close modal and session page together
  const handleCancelMode = () => {
    setIsModeOpen(false);
    setIsSessionOpen(false);
  };
  // close modal on Escape
  useEffect(() => {
    if (!isModeOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCancelMode();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isModeOpen]);

  return (
    <>
      <ResponsiveLayout
        sidebar={(closeBar) => (
          <RestaurantNav closeBar={closeBar} openSessionMode={handlePlay} />
        )}
      >
        <Outlet />
      </ResponsiveLayout>

      {/* Session page slides in from the right */}
      {isSessionOpen &&
        createPortal(
          <POSUserSession onExit={() => setIsSessionOpen(false)} />,
          document.body,
        )}

      {/* Blur overlay + modal, above the session page */}
      {isModeOpen &&
        createPortal(
          <div
            className="fixed inset-x-0 bottom-0 top-13 z-[10000] flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
            onClick={handleCancelMode}
          >
            <SessionModeModal
              onClose={handleCancelMode}
              onSelect={handleSelectMode}
            />
          </div>,
          document.body,
        )}
    </>
  );
};

export default RestaurantLayout;
