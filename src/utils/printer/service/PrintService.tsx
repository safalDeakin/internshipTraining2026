
export class PrintService {

    // --------------------------------
    // HTML PRINTING
    // --------------------------------

    static initialize(
        iframe: HTMLIFrameElement,
        documentName: string
    ): void {
        const doc = iframe.contentDocument;

        if (!doc) {
            throw new Error("Unable to access print document");
        }

        doc.open();
        doc.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>${documentName}</title>
                </head>
                <body></body>
            </html>
        `);
        doc.close();
    }

    private static copyStyles(doc: Document): void {

        doc.head
            .querySelectorAll("[data-print-style]")
            .forEach(element => element.remove());

        document
            .querySelectorAll('link[rel="stylesheet"], style')
            .forEach(element => {
                const clonedElement =
                    element.cloneNode(true) as HTMLElement;

                clonedElement.setAttribute(
                    "data-print-style",
                    "true"
                );

                doc.head.appendChild(clonedElement);
            });

        const printStyle = doc.createElement("style");

        printStyle.setAttribute("data-print-style", "true");

        printStyle.textContent = `
            body {
                margin: 0;
                padding: 16px;
            }

            @media print {
                body {
                    padding: 0;
                }
            }
        `;

        doc.head.appendChild(printStyle);
    }

    static printHTML(
        iframe: HTMLIFrameElement,
        content: HTMLElement,
        documentName: string,
        includeRoot = false
    ): void {

        const doc = iframe.contentDocument;
        const printWindow = iframe.contentWindow;

        if (!doc || !printWindow) {
            throw new Error("Print iframe is unavailable");
        }

        doc.title = documentName;

        this.copyStyles(doc);

        doc.body.innerHTML = includeRoot
            ? content.outerHTML
            : content.innerHTML;

        printWindow.focus();
        printWindow.print();
    }


    // --------------------------------
    // PDF PRINTING
    // --------------------------------

    static printPDF(url: string): void {

        const printWindow = window.open(url, "_blank");

        if (!printWindow) {
            throw new Error(
                "Unable to open PDF for printing. Popup blocked."
            );
        }

        printWindow.addEventListener("load", () => {
            printWindow.focus();
            printWindow.print();
        });
    }

    // --------------------------------
    // THERMAL PRINTING for POS Order Printing
    // --------------------------------

    // static async printThermal(
    //     data: ThermalPrintData
    // ): Promise<void> {
    //     const { invoke } = await import("@tauri-apps/api/core");

    //     await invoke("print_thermal", {
    //         data
    //     });
    // }
}
