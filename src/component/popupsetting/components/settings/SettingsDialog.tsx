import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { SettingsDialogProps } from "../../types/settings";
import SettingsHeader from "./SettingsHeader";
import SettingsNavigation from "./SettingsNavigation";
import SettingsContent from "./SettingsContent";

const CLOSE_DURATION = 200;
export default function SettingsDialog({
    activeSection,
    isOpen,
    onClose,
    onSectionChange,
}: SettingsDialogProps) {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isClosing, setIsClosing] = useState(false);
    useEffect(() => {
        if (isOpen) {
            // Mount the portal 
            setShouldRender(true);

            // Make sure it is not in closing state
            setIsClosing(false);

            // Focus after the dialog has mounted
            requestAnimationFrame(() => {
                closeButtonRef.current?.focus();
            });

            return;
        }

        // Start closing animation 
        if (shouldRender) {
            setIsClosing(true);

            const timeout = window.setTimeout(() => {
                setShouldRender(false);
                setIsClosing(false);
            }, CLOSE_DURATION);

            return () => {
                window.clearTimeout(timeout);
            };
        }
    }, [isOpen]);
    if (!shouldRender) {
        return null;
    }
    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#eee8e8] p-[13px_10px_16px]"
            onMouseDown={(event) => {
                if (event.currentTarget === event.target) {
                    onClose();
                }
            }} >
            <section
                aria-labelledby="settings-title"
                aria-modal="true"
                className={` 
                flex 
                max-h-[calc(100dvh-29px)] 
                w-full 
                max-w-178.5 
                origin-center 
                flex-col 
                overflow-hidden 
                rounded-[9px] 
                bg-[#fbfcfc] 
                shadow-[0_1px_4px_rgba(49,60,70,0.03)] 
                ${isClosing
                        ? "animate-[settingsDialogOut_200ms_ease-in_forwards]"
                        : "animate-[settingsDialogIn_300ms_cubic-bezier(0.16,1,0.3,1)_forwards]"
                    } 
                `}
                role="dialog" >
                <SettingsHeader
                    closeButtonRef={closeButtonRef}
                    onClose={onClose} />

                <div
                    className="grid min-h-0 flex-1 grid-cols-[170px_minmax(0,1fr)] gap-2.25 px-4.25 pb-4.25 pt-2.75 max-sm:grid-cols-1 max-sm:overflow-y-auto">
                    <SettingsNavigation
                        activeSection={activeSection} onSectionChange={onSectionChange}
                    />

                    <SettingsContent
                        activeSection={activeSection}
                    />
                </div>
            </section>
        </div>, document.body);
}