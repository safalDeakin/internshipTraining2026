import {
    useCallback,
    useEffect,
    useState,
} from "react";

export type SettingsSection =
    | "appearance"
    | "accounts"
    | "devices";

export function useSettingsDialog() {

    // Dialog state
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<SettingsSection>("accounts");


    // Dialog actions
    const openDialog = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeDialog = useCallback(() => {
        setIsOpen(false);
    }, []);

    const changeSection = useCallback(
        (section: SettingsSection) => {
            setActiveSection(section);
        }, []);


    // Modal behavior
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeDialog();
            }
        };

        // Prevent page scrolling while dialog is open
        document.body.style.overflow = "hidden";

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            document.body.style.overflow =
                previousOverflow;

            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [closeDialog, isOpen]);


    return {
        activeSection,
        changeSection,
        closeDialog,
        isOpen,
        openDialog,

    };
}