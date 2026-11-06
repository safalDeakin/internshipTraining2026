import type { ReactNode, RefObject } from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { usePdf } from "./service/usePdf";
import "./style.css";

interface PdfPreviewWrapperProps {
    children: ReactNode;
    content?: ReactNode | null;
    contentRef?: RefObject<HTMLDivElement | null> | null;
    documentName: string;
    openInNewTab?: boolean; // Controls whether it opens in a new tab or modal popup
    className?: string;
}

export default function PdfPreviewWrapper({
    children,
    content = null,
    contentRef = null,
    documentName,
    openInNewTab = false, // Defaults to popup modal
    className = "",
}: PdfPreviewWrapperProps) {

    const internalRef = useRef<HTMLDivElement>(null);
    const printRef = contentRef ?? internalRef;

    // PDF functionality driven by the openInNewTab prop
    const {
        pdfUrl,
        loadPDF,
        loading,
        closePreview,
    } = usePdf({
        contentRef: printRef,
        documentName,
        openInNewTab,
    });



    // Close preview modal on Escape key press (only active if modal is open)
    useEffect(() => {
        if (!pdfUrl) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closePreview();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [pdfUrl, closePreview]);

    return (
        <>
            {/* PRINT TRIGGER */}
            <div
                className={className}
                onClick={loading ? undefined : loadPDF}
                aria-busy={loading}
            >
                {children}
            </div>

            {/* PRINTABLE CONTENT */}
            <div className="print-content">
                {!contentRef && content && (
                    <div
                        ref={internalRef}
                    >
                        {content}
                    </div>
                )}
            </div>

            {/* LOADING MODAL (Shown only when generating in popup mode and loading) */}
            {loading && createPortal(
                <div className="pdf-loading-overlay">
                    <div className="pdf-loading-card">
                        <div className="pdf-spinner" />
                        <p>Generating PDF...</p>
                        <span>Please wait</span>
                    </div>
                </div>,
                document.body
            )}

            {/* PDF PREVIEW POPUP MODAL (Shown only when openInNewTab is false and pdfUrl is ready) */}
            {pdfUrl && !openInNewTab && createPortal(
                <div
                    className="pdf-overlay"
                    onClick={closePreview}
                >
                    <div
                        className="pdf-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="pdf-close-button"
                            onClick={closePreview}
                            aria-label="Close PDF preview"
                        >
                            &times;
                        </button>

                        <iframe
                            key={pdfUrl}
                            src={`${pdfUrl}#toolbar=1&navpanes=0`}
                            title={documentName}
                            className="pdf-viewer"
                        />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}