import { useEffect } from "react";
import type { DrawerOptions } from "./DrawerContext";
import "./styles.css";

type DrawerContainerProps = {
    isClosing: boolean;
    onCloseComplete: () => void;
    drawer: Required<DrawerOptions>;
    onClose: (result?: unknown) => void;
};

export default function DrawerContainer({
    isClosing,
    drawer,
    onClose,
    onCloseComplete,
}: DrawerContainerProps) {

    useEffect(() => {
        if (!drawer.closeOnEscape) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [drawer.closeOnEscape, onClose]);

    const handleBackdropClick = () => {
        if (drawer.closeOnBackdrop) {
            onClose();
        }
    };

    return (
        <div className="drawer-overlay">
            <div
                className="drawer-backdrop"
                onClick={handleBackdropClick}
            />
            <div
                className={`drawer-container ${isClosing
                    ? "drawer-closing"
                    : "drawer-opening"
                    }`}
                style={{
                    width: drawer.width,
                }}
                onAnimationEnd={() => {
                    if (isClosing) {
                        onCloseComplete();
                    }
                }}
            >
                {
                    drawer.showHeader && (
                        <div
                            className="drawer-header"
                        >
                            <span>{drawer.title}</span>
                            <button
                                className="drawer-close-button"
                                onClick={() => onClose()}
                                aria-label="Close dialog">
                                X
                            </button>
                        </div>

                    )}
                {
                    drawer.showHeader && (
                        <hr style={{ margin: 0 }}></hr>
                    )
                }
                {drawer.content}
            </div>
        </div>
    );
}