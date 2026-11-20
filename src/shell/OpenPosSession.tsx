import { useState } from "react";
import { useAuth } from "../lib/utils/secureclient/useAuth";
import useDrawer from "../lib/component/Drawer/useDrawer";
import { usePOSUserSession } from "./hooks/usePOSUserSession";
import type { POSSessionMode } from "./types/posSessionTypes";
import POSUserSession from "./POSUserSession";
import ContinueSession from "./modal/ContinueSession";
import ClosingSessionModal from "./modal/ClosingSessionModal";
import { Component } from "lucide-react";
import InactiveSessionModal from "./modal/InactiveSessionModal";
import StartingSessionModal from "./modal/StartingSessionModal";

export default function OpenPOSSession() {
    const [isPausedPromptOpen, setIsPausedPromptOpen] = useState(false);
    const [isClosingFormOpen, setIsClosingFormOpen] = useState(false);
    const { closeDrawer } = useDrawer();

    const [content, setContent] = useState<Component>(
        <POSUserSession
            onExit={closeDrawer}
            onCancelStart={closeDrawer}
        />
    );


    const { organization, user } = useAuth();
    const organizationId = organization?.id;

    const {
        getActiveSession,
        getPausedSession,
        resumeSession,
        endSession,
    } = usePOSUserSession();

    // Get current organization's active session.
    const activeSession =
        organizationId != null ? getActiveSession(organizationId) : undefined;

    // Get current organization's paused session.
    const session =
        organizationId != null ? getPausedSession(organizationId) : undefined;

    const handleCancelClosing = () => {
        setIsClosingFormOpen(false);
        setIsPausedPromptOpen(true);
    };

    // OPEN CLOSING FORM
    const handleOpenClosingForm = () => {
        setIsPausedPromptOpen(false);
        setIsClosingFormOpen(true);
    };

    // END PAUSED SESSION
    const handleConfirmEndSession = (data: {
        closingCash: number;
        notes: string;
    }) => {
        if (!session) return;

        endSession(session.id, data.closingCash, data.notes);
        closeDrawer();
    };


    const continueSession = () => {
        return (
            <ContinueSession
                session={session!}
                handleContinueSession={() => {
                    if (!session) return;

                    resumeSession(session.id);

                    loadPosSessionMain();
                }}
                handleOpenClosingForm={loadCloseSession}
                setIsPausedPromptOpen={setIsPausedPromptOpen}
            >
            </ContinueSession>
        );
    }

    const loadPosSessionMain = () => {
        return (
            <POSUserSession
                onExit={closeDrawer}
                onCancelStart={closeDrawer}
            />
        )
    }

    const startNewSession = () => {

        return (
            <InactiveSessionModal
                staffName={user?.name ?? "Unknown"}
                terminal="Main Counter"
                date={new Date().toLocaleDateString()}
                onClose={closeDrawer}
                onSelect={(mode, data) => {
                    setContent(
                        <StartingSessionModal
                            staffName={user?.name ?? "Unknown"}
                            terminal={"Main Counter"}
                            date={new Date().toLocaleDateString()}
                            onCancel={() => startNewSession()}
                            onConfirm={(data) => {
                                console.log("2. InactiveSessionModal received:", data);
                                console.log("Selected mode:", mode);

                                onSelect(mode, data);
                            }}
                        />)
                }}
            />
        );
    }


    const loadCloseSession = () => {
        return (<ClosingSessionModal
            staffName={session!.staffName}
            terminal={session!.terminal}
            date={new Date(session!.date).toLocaleDateString()}
            onCancel={handleCancelClosing}
            onConfirm={handleConfirmEndSession}
        />);
    }


    return (
        <>
            {
                session == undefined ?
                    startNewSession() : continueSession()

            }
            {content}


            {isClosingFormOpen && session && (
                loadCloseSesion()
            )}
        </>
    );
}

