
import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import html2pdf from "html2pdf.js";
import { PrintService } from "./PrintService";

interface UsePdfProps {
    contentRef: RefObject<HTMLDivElement | null>;
    documentName: string;
    openInNewTab?: boolean;
}

export function usePdf({
    contentRef,
    documentName,
    openInNewTab = false,
}: UsePdfProps) {

    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const pdfUrls = useRef<string[]>([]);
    const loadingRef = useRef(false);

    useEffect(() => {
        return () => {
            pdfUrls.current.forEach(URL.revokeObjectURL);
            pdfUrls.current = [];
        };
    }, []);

    const generatePDF = useCallback(async () => {
        const element = contentRef.current;

        if (!element || loadingRef.current) return null;

        loadingRef.current = true;
        setLoading(true);

        const startTime = Date.now();

        try {
            const options = {
                margin: [10, 10, 10, 10] as [number, number, number, number],
                filename: `${documentName}.pdf`,
                image: {
                    type: "jpeg" as const,
                    quality: 0.98,
                },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: "#ffffff",
                },
                jsPDF: {
                    unit: "mm" as const,
                    format: "a4",
                    orientation: "portrait" as const,
                },
                pagebreak: {
                    mode: ["css", "legacy"] as const,
                },
            };

            const pdfBlob = await html2pdf()
                .set(options)
                .from(element)
                .outputPdf("blob");

            const url = URL.createObjectURL(pdfBlob);
            pdfUrls.current.push(url);

            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 600 - elapsed);

            if (remaining > 0) {
                await new Promise(resolve => setTimeout(resolve, remaining));
            }

            return url;

        } catch (error) {
            console.error("PDF generation failed:", error);
            return null;

        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, [contentRef, documentName]); // Removed openInNewTab dependency here

    const loadPDF = useCallback(async () => {
        console.trace("loadPDF was called by:"); // <-- Ad
        if (pdfUrl) {
            if (openInNewTab) {
                window.open(pdfUrl, "_blank");
            }
            return pdfUrl;
        }

        // 1. Open blank tab immediately on user click to prevent popup blockers
        const newTab = openInNewTab
            ? window.open("about:blank", "_blank")
            : null;

        const url = await generatePDF();

        if (!url) {
            newTab?.close();
            return null;
        }

        if (openInNewTab && newTab) {
            newTab.location.href = url;
            return url;
        } else {
            setPdfUrl(url);
        }

        return url;
    }, [pdfUrl, generatePDF, openInNewTab]);

    const printPDF = useCallback(async () => {
        const url = pdfUrl ?? await generatePDF();

        if (!url) return;

        PrintService.printPDF(url);
    }, [pdfUrl, generatePDF]);

    const downloadPDF = useCallback(async () => {
        const url = pdfUrl ?? await generatePDF();

        if (!url) return;

        const link = document.createElement("a");
        link.href = url;
        link.download = `${documentName}.pdf`;

        document.body.appendChild(link);
        link.click();
        link.remove();
    }, [pdfUrl, generatePDF, documentName]);

    const closePreview = useCallback(() => {
        setPdfUrl(null);
    }, []);

    return {
        pdfUrl,
        loading,
        loadPDF,
        printPDF,
        closePreview,
        downloadPDF,
    };
}
