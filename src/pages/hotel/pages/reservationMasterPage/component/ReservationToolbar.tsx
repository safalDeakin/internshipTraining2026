
import { Edit, Download, Printer, Bed } from "lucide-react";
import FinalReceipts from "../../../../recepits/FinalReceipts";
import PrintReservationForm from "./ReservationForm";
import { mapReservationToPrintData } from "../provider/mapReservationToPrintData";
import type { ReservationDetailModel } from "../model/ReservationModel";
import PdfPreviewWrapper from "../../../../../utils/printer/PreviewWrapper";

type ReservationToolbarProps = {
    status: string
    reservationCode: string,
    reservationId: string,
    roomNumber: string,
    data: ReservationDetailModel,
};


export default function ReservationToolbar({
    status,
    reservationCode,
    reservationId,
    // roomNumber,
    data
}: ReservationToolbarProps) {

    const isCancelled = status === 'Cancelled';
    return (< div className="flex items-center justify-between rounded-md border-b border-gray-200 bg-gray-50 px-4 py-3" >
        <div className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-blue-600" />
            <span className="text-base font-semibold text-gray-800">{reservationCode}</span>
            <span className="text-sm text-gray-500">({reservationId})</span>

            <span
                className={`ml-1 rounded-full px-3 py-0.5 text-xs font-medium text-white ${status === "Active" ? "bg-teal-600" : "bg-gray-400"
                    }`}
            >
                {status}
            </span>
            <span className={`w-2 h-2 rounded-full ${isCancelled ? 'bg-red-400' : 'bg-green-400'}`} />
        </div>

        <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                onClick={() => {
                    console.log("Request Room Service clicked");
                }}
            >
                <Edit className="h-3.5 w-3.5" />
                Room Service
            </button>


            <PdfPreviewWrapper documentName="ReservationForm"
                openInNewTab={false}
                content={<FinalReceipts />}>
                <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700">
                    <Edit className="h-3.5 w-3.5" />
                    Invoice
                </button>
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
                        data={mapReservationToPrintData(data)}
                    />
                }>
                <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700">
                    <Printer size={13} />
                    Print
                </button>
            </PdfPreviewWrapper>
            <button
                disabled={isCancelled}
                className="flex items-center gap-1.5 rounded bg-red-400 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                onClick={() => {
                    console.log("Cancel Reservation clicked");
                }}
            >
                <Edit className="h-3.5 w-3.5" />
                Cancel
            </button>
        </div>

    </div >
    );
}
