import { useEffect } from "react";
import type { DialogState } from "./Model";
import './style.css';

type DialogContainerProps = {
    dialog: DialogState;
    onClose: (result?: unknown) => void;
};

export default function DialogContainer({
    dialog,
    onClose,
}: DialogContainerProps) {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.key === "Escape" &&
                dialog.closeOnEscape
            ) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [dialog.closeOnEscape, onClose]);

    return (
        <div className="dialog-overlay"
            onMouseDown={(event) => {
                if (dialog.closeOnBackdrop && event.target === event.currentTarget) {
                    onClose();
                }
            }
            }>
            <div
                className="dialog-container" role="dialog" aria-modal="true"
                style={{ width: (dialog.width === -1 ? undefined : dialog.width) }}
            >

                {
                    dialog.showCloseButton && (
                        <button className="dialog-close" onClick={() => onClose()}
                            aria-label="Close dialog">
                            ×
                        </button>
                    )}
                {dialog.content}
            </div>
        </div>
    );
}