import { Printer } from "lucide-react";
import PdfPreviewWrapper from "../../../../../lib/utils/printer/PreviewWrapper";
import PrintBlankReservationForm from "./PrintBlankReservationForm";

export function ReservationHeader() {
    return (
        <header className="flex justify-between ">
            <div>
                <PdfPreviewWrapper documentName="ReservationForm"
                    openInNewTab={true}
                    content={
                        <PrintBlankReservationForm
                        />
                    }>
                    <button className="flex gap-2 items-center">
                        <Printer size={13} />
                        Print Resrevation Form
                    </button>
                </PdfPreviewWrapper>

            </div>
        </header>
    )
}
