
import type { ReactNode, RefObject } from "react";
import { usePrint } from "./service/usePrint";

interface BrowserPrintButtonProps {
    children: ReactNode;
    content?: ReactNode | null;
    contentRef?: RefObject<HTMLDivElement | null> | null;
    documentName?: string;
    className?: string;
}

export default function BrowserPrintButton({
    children,
    content = null,
    contentRef = null,
    documentName = "Document",
    className = "",
}: BrowserPrintButtonProps) {

    const {
        internalRef,
        iframeRef,
        handlePrint,
    } = usePrint({
        contentRef,
        documentName,
    });

    return (
        <>
            {/* PRINT BUTTON */}
            <div
                className={className}
                onClick={handlePrint}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handlePrint();
                    }
                }}
            >
                {children}
            </div>

            {/* INTERNAL PRINTABLE CONTENT */}
            {!contentRef && content && (
                <div
                    ref={internalRef}
                    style={{
                        position: "absolute",
                        left: "-10000px",
                        top: 0,
                        width: "800px",
                        visibility: "hidden",
                        pointerEvents: "none",
                    }}
                >
                    {content}
                </div>
            )}

            {/* PRINT IFRAME */}
            <iframe
                ref={iframeRef}
                title={documentName}
                style={{
                    position: "fixed",
                    width: 0,
                    height: 0,
                    border: 0,
                    visibility: "hidden",
                }}
            />
        </>
    );
}
