
import { Edit, Download, Printer, Bed } from "lucide-react";
import PrintReservationForm from "./ReservationForm";

import PdfPreviewWrapper from "../../../../../utils/printer/PreviewWrapper";
import { Invoice } from "../../../../recepits/Invoice";
import { useReservationDetail } from "../provider/detailProvider/useReservationDetail";
import Toolbar from "../../../../../component/Toolbar/Toolbar";
import Button from "../../../../../component/Button/Button";
import { useRef } from "react";


export default function ReservationToolbar() {
    const reservation = useReservationDetail();
    const info = reservation.info;

    const isCancelled = info.status === 'Cancelled';
    const invoiceRef = useRef<HTMLDivElement>(null);
    return (
        <Toolbar
            left={
                <>
                    <Bed className="h-5 w-5 text-blue-600" />
                    <span className="text-base font-semibold text-gray-800">{info.reservationCode}</span>
                    <span className="text-sm text-gray-500">({info.id})</span>

                    <span
                        className={`ml-1 rounded-full px-3 py-0.5 text-xs font-medium text-white ${info.status === "Active" ? "bg-teal-600" : "bg-gray-400"
                            }`}
                    >
                        {info.status}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isCancelled ? 'bg-red-400' : 'bg-green-400'}`} />
                </>
            }
            center={
                <>
                    <Button variant="danger" size="md"
                        onClick={() => {
                            console.log("Request Room Service clicked");
                        }}
                    >
                        <Edit className="h-3.5 w-3.5" />
                        Room Service
                    </Button>

                    <PdfPreviewWrapper documentName="ReservationForm"
                        openInNewTab={false}
                        content={
                            <Invoice data={reservation.getInvoice()} />
                        }
                    >
                        <Button >
                            <Edit className="h-3.5 w-3.5" />
                            Invoice
                        </Button>
                    </PdfPreviewWrapper>

                    <PdfPreviewWrapper documentName="ReservationForm"
                        openInNewTab={false}
                        contentRef={invoiceRef}
                    >
                        <Button >
                            <Edit className="h-3.5 w-3.5" />
                            Invoice from ref
                        </Button>
                    </PdfPreviewWrapper>
                    {/* FinalReceipts Popup */}
                    <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                        onClick={() => {
                            console.log("Change Room clicked");
                        }}
                    >
                        <Edit className="h-3.5 w-3.5" />
                        Swap Room
                    </button>

                    <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                        onClick={() => {
                            console.log("Cancel Reservation clicked");
                        }}
                    >
                        <Download size={13} /> Export
                    </button>
                    <PdfPreviewWrapper documentName="ReservationForm"
                        openInNewTab={true}
                        content={
                            <PrintReservationForm
                                data={
                                    reservation.getReservationPdfForm()}
                            />
                        }>
                        <Button >
                            <Printer size={13} />
                            Print
                        </Button>
                    </PdfPreviewWrapper>
                    <Button
                        variant={isCancelled ? "ghost" : "danger"}
                        onClick={() => {
                            console.log("Cancel Reservation clicked");
                        }}
                    >
                        <Edit className="h-3.5 w-3.5" />
                        Cancel
                    </Button>
                </>
            }
        />
    );
}


