
import { useCallback, useEffect, useRef } from "react";
import type { RefObject } from "react";
import { PrintService } from "./PrintService";

interface UsePrintProps {
    contentRef?: RefObject<HTMLDivElement | null> | null;
    documentName?: string;
}

export function usePrint({
    contentRef = null,
    documentName = "Document",
}: UsePrintProps = {}) {

    const internalRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Initialize print iframe
    useEffect(() => {
        const iframe = iframeRef.current;

        if (!iframe) return;

        PrintService.initialize(iframe, documentName);

    }, [documentName]);

    // Handle printing
    const handlePrint = useCallback(() => {

        const iframe = iframeRef.current;

        const source = contentRef
            ? contentRef.current
            : internalRef.current;

        if (!iframe || !source) {
            console.error("Printable content not found");
            return;
        }

        try {
            PrintService.printHTML(
                iframe,
                source,
                documentName,
                contentRef !== null
            );
        } catch (error) {
            console.error("Printing failed:", error);
        }

    }, [contentRef, documentName]);

    return {
        internalRef,
        iframeRef,
        handlePrint,
    };
}
