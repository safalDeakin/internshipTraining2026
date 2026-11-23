import useDrawer from "../lib/component/Drawer/useDrawer";
import useDialogBox from "../lib/component/DialogueBox/useDialogueBox";
import ContinueSession from "./modal/ContinueSession";
import ClosingSessionModal from "./modal/ClosingSessionModal";
import { useUserSession } from "./context/UserSessionProvider";
import NewSessionModal from "./modal/NewSessionModal";
import ExitSessionModal from "./modal/ExitSessionModal";
import { useEffect, type ReactNode } from "react";
import POSScreen from "./POSScreen";

export default function RunPOSSession() {
    const { closeDrawer } = useDrawer();
    const { showDialog, closeDialog } = useDialogBox();
    const { session, userName, startNewSession, pauseSession, continueSession, endSession } = useUserSession();

    const loadEndSession = (onBack: () => void): ReactNode => {
        if (session != null) {
            return (
                <ClosingSessionModal
                    staffName={session!.staffName}
                    terminal={session!.terminal}
                    date={new Date(session!.date).toLocaleDateString()}
                    onCancel={onBack}
                    onConfirm={(data) => {
                        endSession(data.closingCash, data.notes);
                        closeDialog();
                        closeDrawer();
                    }} />

            );
        } else {
            return (<></>);
        }

    }

    useEffect(() => {
        if (session == null) {
            showDialog({
                title: "Start Session",
                showHeader: false,
                content: (
                    <NewSessionModal
                        staffName={userName ?? "Unknown"}
                        terminal="Main Counter"
                        date={new Date().toLocaleDateString()}
                        onClose={() => {
                            closeDialog()
                            closeDrawer()
                        }
                        }
                        onSelect={(mode, data) => {
                            startNewSession(
                                mode,
                                data.openingCash,
                                data.notes
                            );
                            closeDialog()
                        }}
                    />
                )
            });
        } else if (session.status == 'paused') {
            showDialog({
                title: 'Continue Session',
                content: <ContinueSession
                    session={session}
                    onCancel={closeDrawer}
                    loadEndSession={(onBack) => {
                        return loadEndSession(onBack);
                    }}
                    onContinueSession={continueSession}
                />
            })
        }
    }, [session]);

    return (
        <>
            <POSScreen
                onExit={() => {
                    console.log('running the function')
                    showDialog({
                        title: 'Exit Session',
                        content:
                            <ExitSessionModal
                                session={session!}
                                onCancel={closeDialog}
                                onPauseSession={() => {
                                    pauseSession()
                                    closeDialog()
                                    closeDrawer()
                                }}
                                loadEndSession={(onBack) => {
                                    return loadEndSession(onBack)
                                }}
                            />
                    }
                    )
                }}
            />

        </>
    );
}


