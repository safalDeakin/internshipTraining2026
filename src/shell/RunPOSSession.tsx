import useDrawer from "../lib/component/Drawer/useDrawer";
import useDialogBox from "../lib/component/DialogueBox/useDialogueBox";
import ContinueSession from "./modal/ContinueSession";
import ClosingSessionModal from "./modal/ClosingSessionModal";
import { useUserSession } from "./context/UserSessionProvider";
import StartNewSession from "./modal/NewSessionModal";
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
                    session={session}
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
                closeOnBackdrop: false,
                closeOnEscape: false,
                title: "Start Session",
                showHeader: false,
                width: 400,
                content: (
                    <StartNewSession
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
                                data
                            );
                            closeDialog()
                        }}
                    />
                )
            });
        } else if (session.status == 'paused') {
            showDialog({
                closeOnEscape: false,
                closeOnBackdrop: false,
                title: 'Continue Session',
                width: 400,
                content: <ContinueSession
                    session={session}
                    onCancel={() => {
                        closeDialog()
                        closeDrawer()
                    }}
                    loadEndSession={(onBack) => {
                        return loadEndSession(onBack);
                    }}
                    onContinueSession={() => {
                        continueSession()
                        closeDialog()
                    }}
                />
            })
        }
    }, [session]);

    return (
        <>
            <POSScreen
                onExit={() => {
                    console.log('running the function')
                    if (session != null) {
                        showDialog({
                            title: 'Exit Session',
                            width: 400,
                            content:
                                <ExitSessionModal
                                    session={session!}
                                    onCancel={closeDialog}
                                    onPauseSession={() => {
                                        if (session.mode == 'Session') {
                                            pauseSession()
                                        }
                                        closeDialog()
                                        closeDrawer()
                                    }}
                                    loadEndSession={(onBack) => {
                                        if (session.mode == 'Session') {
                                            return loadEndSession(onBack)
                                        } else {
                                            closeDialog()
                                            closeDrawer()
                                        }
                                    }}
                                />
                        }
                        )
                    } else {
                        closeDialog()
                        closeDrawer()
                    }

                }}
            />

        </>
    );
}


