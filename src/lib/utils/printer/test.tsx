import { useRef } from "react";
import PdfPreviewWrapper from "./PreviewWrapper";
import BrowserPrintButton from "./PrinterWrapper";

export default function InvoicePage() {
    const invoiceRef = useRef(null);
    return (
        <>
            <PdfPreviewWrapper
                content={<div>
                    Printing Content Directly Passed to PrintButton;
                </div>}
                documentName="Inv-0012"
                openInNewTab={true}

            >
                <button>
                    Print in New Tab
                </button>
            </PdfPreviewWrapper >

            <PdfPreviewWrapper
                content={<div>
                    Printing Content Directly Passed to PrintButton;
                </div>}
                documentName="Inv-0012"
                openInNewTab={false}
            >
                <button>
                    Print in Pop Up
                </button>
            </PdfPreviewWrapper >
            <div ref={invoiceRef}>
                Printing Content  Passed to PrintButton through referenced doc;
            </div>



            <PdfPreviewWrapper
                contentRef={invoiceRef}
                documentName="Inv-0012"
            >
                <button>
                    Print in PopUp Ref
                </button>
            </PdfPreviewWrapper>
            <PdfPreviewWrapper
                contentRef={invoiceRef}
                documentName="Inv-0012"
                openInNewTab={true}
            >
                <button>
                    Print in PopUp Ref
                </button>
            </PdfPreviewWrapper >
        </>
    )
}
