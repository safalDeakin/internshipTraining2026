import { ReactNode, useState } from "react";
import { X } from "lucide-react";

export default function PopupContainer({
    title,
    width,
    onClose,
    children
}: { title: string, width: number, onClose: () => void, children: ReactNode }) {
    const [isClosing, setIsClosing] = useState(false);
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#eee8e8] p-[13px_10px_16px]"
            style={{ width: width }}
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
                {/* HEader */}
                <header className="mx-4.25 flex h-14.75 shrink-0 items-center justify-between border-b border-[#e7e8e8] px-1.5">
                    <h1
                        id="settings-title"
                        className="text-[13px] font-medium text-[#073252]"
                    >
                        {title}
                    </h1>

                    <button
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
                {/* Body */}
                {children}
            </section>


        </div>

    );
}