import { useEffect } from "react";
import './style.css';
import type { DialogState } from "./DialogContext";

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
                event.key === "Escape" && dialog &&
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
        <div
            className="dialog-overlay"
            onMouseDown={(event) => {
                if (dialog.closeOnBackdrop && event.target === event.currentTarget) {
                    onClose();
                }
            }
            }>

            <div
                className="dialog-container"
                role="dialog" aria-modal="true"
                style={{
                    width: (dialog.width === -1 ? undefined : dialog.width),

                }}
            >

                {
                    dialog.showHeader && (
                        <div
                            className="dialog-header"
                        >
                            <span>{dialog.title}</span>
                            <button
                                className="dialog-close"
                                onClick={() => onClose()}
                                aria-label="Close dialog">
                                X
                            </button>
                        </div>

                    )}
                {
                    dialog.showHeader && (
                        <hr style={{ margin: 0 }}></hr>
                    )
                }
                {dialog.content}
            </div>
        </div >
    );
}