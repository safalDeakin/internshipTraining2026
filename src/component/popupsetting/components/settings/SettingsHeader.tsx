import { X } from "lucide-react";

interface SettingsHeaderProps {
    closeButtonRef: React.RefObject<HTMLButtonElement | null>;
    onClose: () => void;
}

export default function SettingsHeader({
    closeButtonRef,
    onClose,
}: SettingsHeaderProps) {
    return (
        <header className="mx-4.25 flex h-14.75 shrink-0 items-center justify-between border-b border-[#e7e8e8] px-1.5">
            <h1
                id="settings-title"
                className="text-[13px] font-medium text-[#073252]"
            >
                Shell-Settings
            </h1>

            <button
                ref={closeButtonRef}
                aria-label="Close settings"
                className="grid size-8 place-items-center text-[#111] transition-colors hover:text-[#348fe9] focus-visible:outline-2 focus-visible:outline-[#348fe9]"
                onClick={onClose}
                type="button"
            >
                <X
                    aria-hidden="true"
                    size={23}
                    strokeWidth={1.7}
                />
            </button>
        </header>
    );
}